import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import uk from 'vuetify/lib/locale/uk';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { uk },
      current: 'uk',
    },
});
