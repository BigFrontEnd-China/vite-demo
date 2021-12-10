export default {
  name: 'fix-form-height',
  handler: {
    inserted: function (el) {
      el.style.height = el.offsetHeight - 24 + 'px';
    }
  }
};
