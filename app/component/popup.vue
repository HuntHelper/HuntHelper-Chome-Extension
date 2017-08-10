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
  import huntHelperApi from '../scripts/axios'
  import { mapGetters } from 'vuex'

  export default {
    // Options / Data
    data () {
    	return {
        access_token: null,
        clientId: 'dmnogfajpihogafhgmcdegmiilblnojc',
        redirectUri: chrome.identity.getRedirectURL('provider_cb'),
        redirectRe: new RegExp(this.redirectUri + '[#\?](.*)')
      }
    },
    // props: [],
    computed: {
      ...mapGetters([
        'hunterIsLoggedIn'
      ]),
      authUrl: function() {
        return `__HOST__/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.encodedRedirectUri}`
      },
      encodedRedirectUri: function() {
        return encodeURIComponent(this.redirectUri)
      },
      webAuthFlowOptions: function() {
        return { interactive: true, url: this.authUrl() }
      }
    },
    methods: {
      exchangeCodeForToken: function(code) {
        return huntHelperApi.post('__HOST__/oauth/token', { params: {
          client_id: this.clientId,
          redirect_uri: this.encodedRedirectUri,
          code: code
        } }).then((response) => {
          if (HH_ENVIRONMENT != 'production') console.log(response) //eslint-disable-line
          if (response.body.hasOwnProperty('access_token')) {
            this.access_token = response.body.access_token
          // } else {
            // callback(new Error('Cannot obtain access_token from code.'));
          }
        }, (err) => {
          if (HH_ENVIRONMENT != 'production') console.log('code exchange status:', this.status) //eslint-disable-line
          // callback(new Error('Code exchange failed'));
        })
      },
      handleProviderResponse: function(values) {
        if (HH_ENVIRONMENT != 'production') console.log('providerResponse', values) //eslint-disable-line
        if (values.hasOwnProperty('access_token'))
          this.access_token = values.access_token
        // If response does not have an access_token, it might have the code,
        // which can be used in exchange for token.
        else (values.hasOwnProperty('code'))
          this.exchangeCodeForToken(values.code)
        // else
          // callback(new Error('Neither access_token nor code avialable.'));
      },
      hhLogin: function() {
        if (this.access_token) {
          // use it to get hunts - probably want to swap loggedIn state somehow
        }
        return this.webAuthPromise().then((redirectUri) => {
          if (HH_ENVIRONMENT != 'production') console.log('launchWebAuthFlow completed', chrome.runtime.lastError,
              redirectUri) //eslint-disable-line
          if (chrome.runtime.lastError) {
            // handle errors
            // callback(new Error(chrome.runtime.lastError))
            return
          }
          // Upon success the response is appended to redirectUri, e.g.
          // https://{app_id}.chromiumapp.org/provider_cb#access_token={value}
          //     &refresh_token={value}
          // or:
          // https://{app_id}.chromiumapp.org/provider_cb#code={value}
          const matches = redirectUri.match(this.redirectRe)
          if (matches && matches.length > 1)
            this.handleProviderResponse(this.parseRedirectFragment(matches[1]))
          // else
            // callback(new Error('Invalid redirect URI'))
        })
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
      },
      parseRedirectFragment: function(fragment) {
        const pairs = fragment.split(/&/)
        let values = {}
        pairs.forEach(function(pair) {
          const nameval = pair.split(/=/)
          values[nameval[0]] = nameval[1]
        })
        return values
      },
      tokenUrl: function(code) {
        return `__HOST__/oauth/token?client_id=${this.clientId}&redirect_uri=${this.encodedRedirectUri}&code=${code}`
      },
      webAuthPromise: function() {
        return new Promise((resolve, _reject) => {
          chrome.identity.launchWebAuthFlow(this.webAuthFlowOptions(), resolve)
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
