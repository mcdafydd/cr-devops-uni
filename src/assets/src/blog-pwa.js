import {LitElement, html, css} from 'lit-element';
import {Workbox} from 'workbox-window';

class BlogPwa extends LitElement {
  static get properties() {
    return {
      offline: {
        type: Boolean,
        value: false,
        attribute: false
      },
      analyticsId: {
        type: String,
        attribute: false
      }
    };
  }

  constructor() {
    super();
    this.analyticsId = 'UA-96204-3';
  }

  firstUpdated() {
    this._ensureLazyLoaded();
    this._initRouter();

    window.addEventListener('online', () => this._notifyNetworkStatus(false));
    window.addEventListener('offline', () => this._notifyNetworkStatus(true));
  }

  _initRouter() {
    const outlet = this.shadowRoot.querySelector('main');
    }]);
  }

  // PRPL all the things.
  _ensureLazyLoaded() {
    if (!this.loadComplete) {
      __import('lazy-resources.js').then((_) => {
        this.__initAnalytics();

        if ('serviceWorker' in navigator) {
          const wb = new Workbox('/service-worker.js');

          wb.addEventListener('activated', (event) => {
            if (!event.isUpdate) {
              this._setSnackBarText('Ready to work offline.');
            }

            // Get the current page URL + all resources the page loaded.
            const urlsToCache = [
              location.href,
              ...performance.getEntriesByType('resource').map((r) => r.name),
            ];
            // Send that list of URLs to your router in the service worker.
            wb.messageSW({
              type: 'CACHE_URLS',
              payload: {urlsToCache},
            });
          });

          wb.addEventListener('waiting', (event) => {
            this._setSnackBarText(
              'New and updated content is available.',
              0,
              true,
              async () => {
                wb.addEventListener('controlling', (event) => {
                  window.location.reload();
                });
                wb.messageSW({type: 'SKIP_WAITING'});
              });
          });

          wb.register();
        }
        this._notifyNetworkStatus();
        this.loadComplete = true;
      });
    }
  }

  _setSnackBarText(text, duration, hold, callback) {
    const timeout = duration || 5000;
    const snackBar = this.shadowRoot.querySelector('snack-bar');

    // Strange bug where the bar blips on some initial loads
    // workaround by hiding at load and then removing as needed one time
    if (snackBar.hasAttribute('hidden')) {
      snackBar.removeAttribute('hidden');
    }

    if (callback) {
      snackBar.trigger = callback;
      snackBar.action = true;
    }

    snackBar.innerHTML = text;
    snackBar.setAttribute('active', '');

    setTimeout(() => {
      if (!hold) {
        snackBar.removeAttribute('active');
      }
    }, timeout);
  }

  _notifyNetworkStatus(status) {
    const oldOffline = this.offline;
    this.offline =  status;

    if (this.offline || (!this.offline && oldOffline === true)) {
      let offlineState = this.offline ? 'You appear to have gone offline.' : 'You appear to now be back online.';
      this._setSnackBarText(offlineState);
    }
  }

  __initAnalytics() {
    window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

    ga('create', this.analyticsId, 'auto');
    ga('set', 'transport', 'beacon');
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');

    const loadErrorEvents = window.__e && window.__e.q || [];
    const fieldsObj = {eventAction: 'uncaught error'};

    // Replay any stored load error events.
    for (let event of loadErrorEvents) {
      this.__trackError(event.error, fieldsObj);
    }

    // Add a new listener to track event immediately.
    window.addEventListener('error', (event) => {
      this.__trackError(event.error, fieldsObj);
    });
  }

  __trackError(error, fieldsObj = {}) {
    ga('send', 'event', Object.assign({
      eventCategory: 'Script',
      eventAction: 'error',
      eventLabel: (error && error.stack) || '(not set)',
      nonInteraction: true,
    }, fieldsObj));
  }

  static get styles() {
    return css`
      main {
        min-height: 100vh;
      }`;
  }

  render() {
    return html`
      <slot name="header"></slot>
      <main></main>
      <slot name="footer"></slot>
      <snack-bar hidden></snack-bar>
      `;
  }
}
customElements.define('blog-pwa', BlogPwa);
