<template lang='pug'>
div
  nav.navbar
    .navbar-brand
      .navbar-item
        img(src='../images/hunthelper_wdwt_logo_64.png' alt='HuntHelper')
  section.section(v-if='loggedIn')
  section.section(v-else)
    .container
      //- p You need to log in to HuntHelper to use this extension. If you don't know your login information, please go to #[a(href='https://www.hunthelper.com') hunthelper.com] to create an account.
      .field
        label.label Email
        .control
          input.input(
            type='text'
            v-model='form.email'
          )
      .field
        label.label Password
        .control
          input.input(
            type='password'
            v-model='form.password'
          )
      .field
        .control
          button.button.is-primary(@click='submitLogin' :class='submitClass') Submit
</template>

<script>
  export default {
    // Options / Data
    data () {
    	return {
        form: {
          email: '',
          password: ''
        },
        loading: false,
        loggedIn: false
      }
    },
    // props: [],
    computed: {
      submitClass: function() {
        this.loading ? ['is-loading'] : []
      }
    },
    methods: {
      submitLogin: function() {
        this.loading = true
        this.$store.dispatch('HUNTER_LOGIN', [this.form]).then(() => {
          this.loading = false
        }, (err) => {
          this.error = err.message
          this.loading = false
        })
      },
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
