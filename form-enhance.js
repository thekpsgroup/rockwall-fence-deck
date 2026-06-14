/* Quote form: downscale photos in the browser before upload.
   Keeps the request small (Vercel rejects bodies over ~4.5 MB) so a lead is
   never lost to oversized phone photos. Any failure falls back to a normal
   submit, so this can only help — it never blocks the form. */
(function () {
  var MAX_EDGE = 1600;   // px on the long side
  var QUALITY = 0.8;     // JPEG quality
  var MAX_FILES = 2;     // photos to send

  var forms = document.querySelectorAll('form[enctype="multipart/form-data"]');
  Array.prototype.forEach.call(forms, function (form) {
    var input = form.querySelector('input[type="file"]');
    if (!input || typeof DataTransfer === 'undefined') return;
    var done = false;

    form.addEventListener('submit', function (e) {
      if (done) return;                              // already processed
      var files = input.files;
      if (!files || !files.length) return;           // nothing to compress
      e.preventDefault();

      var images = Array.prototype.slice.call(files)
        .filter(function (f) { return /^image\//.test(f.type); })
        .slice(0, MAX_FILES);

      if (!images.length) { submit(); return; }

      Promise.all(images.map(shrink)).then(function (out) {
        try {
          var dt = new DataTransfer();
          out.forEach(function (f) { if (f) dt.items.add(f); });
          input.files = dt.files;
        } catch (err) { /* keep originals */ }
        submit();
      }).catch(submit);

      function submit() { done = true; form.submit(); }
    });

    function shrink(file) {
      return new Promise(function (resolve) {
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function () {
          try {
            var scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
            var w = Math.round(img.width * scale);
            var h = Math.round(img.height * scale);
            var canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            canvas.toBlob(function (blob) {
              if (!blob) return resolve(file);
              var name = file.name.replace(/\.(png|webp|heic|heif|tiff?)$/i, '.jpg');
              resolve(new File([blob], name, { type: 'image/jpeg' }));
            }, 'image/jpeg', QUALITY);
          } catch (err) { URL.revokeObjectURL(url); resolve(file); }
        };
        img.onerror = function () { URL.revokeObjectURL(url); resolve(file); };
        img.src = url;
      });
    }
  });
})();
