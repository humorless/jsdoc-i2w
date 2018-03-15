/**
 * @module plugins/tag
 */

//const logger = require('jsdoc/util/logger');

exports.handlers = {
  /**
   * @i2w-level    1
   * @i2w-category adparameter
   * @i2w-note     adparameter is in querystring format
   */
  newDoclet: (e) => {
    let tags = e.doclet.tags;

    // any user-defined tags in this doclet?
    if (typeof tags !== 'undefined') {
      tags = tags.filter($ =>
        $.title === 'i2w-level' ||
        $.title === 'i2w-category' ||
        $.title === 'i2w-note'
      );

      if (tags.length) {
        // eslint-disable-next-line arrow-body-style
        const data = tags.map((m) => {
          return {
            attr:  m.title,
            val :  m.value,
          };
        });
        const i2w = {
          analyzer: e.doclet.name,
          data,
        };
        // debug
        // console.log(i2w);
        e.doclet.meta = e.doclet.meta || {};
        e.doclet.meta.i2w = i2w;
        // e.doclet.meta.filename = value.filename || '';
        // e.doclet.meta.lineno = value.lineno || '';
      }
    }
  },
};
