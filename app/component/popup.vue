<template lang='pug'>
div
  nav.navbar
    .navbar-brand
      .navbar-item
        img(src='../images/hunthelper_wdwt_logo_64.png' alt='HuntHelper')
  section.section(v-if='hunterIsLoggedIn')
    nav.panel
      p.panel-heading Add to HuntHelper
      a.panel-block(v-for="hunt in activeHunts" :key="hunt.id")
        span.panel-icon
          i(:class='huntIconClass(hunt.category)')
        | Add current page to my {{ hunt.category }} hunt
  section(v-else)
    nav.panel
      p.panel-heading
        a(@click='hhLogin') Log in
        |
        | to HuntHelper to use this button
</template>

<script>
  // import huntHelperApi  from '../scripts/axios'
  import { mapGetters } from 'vuex'
  // import * as Cookies   from 'js-cookie'

  export default {
    // Options / Data
    // data () {
    // 	return {}
    // },
    // props: [],
    computed: {
      ...mapGetters([
        'hunterIsLoggedIn'
      ]),
    },
    methods: {
      hhLogin: function() {

      },
      huntIconClass: function(category) {
        switch (category) {
          case 'job':
            return ['fa', 'fa-briefcase']
          case 'apartment':
            return ['fa', 'fa-building']
          default:
            return ['fa', 'fa-bookmark']
        }
      }
    },
    // watch: {},
    // Options / DOM
    // el () {},
    // replace: true,
    // template: '',
    // Options / Lifecycle Hooks
    // init () {},
    // created () {},
    // beforeCompile () {},
    // compiled () {},
    // ready () {},
    // attached () {},
    // detached () {},
    // beforeDestroy () {},
    // destroyed () {},
    // beforeRouteEnter (to, from, next) {},
    // beforeRouteUpdate (to, from, next) {},
    // beforeRouteLeave (to, from, next) {},
    // Options / Assets
    // directives: {},
    // elementDirectives: {},
    // filters: {},
    // components: {},
    // transitions: {},
    // partials: {},
    // Options / Misc
    // parent: null,
    // events: {},
    // mixins: [],
    // name: ''
  }
</script>
