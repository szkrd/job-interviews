<template>
  <div class="root-component" :class="{'width-flipped': widthFlipped, zoomed, outlined}">
    <h1>Card anatomy</h1>
    <p class="controls" @click="persist">
      <button @click="onChangeOutlinedClick" :class="{toggled: outlined}">
        container outlines
      </button>
      <button @click="onChangeZoomClick" :class="{toggled: zoomed}">
        zoom in/out
      </button>
      <button @click="onChangeCardWidthsClick" :class="{toggled: widthFlipped}">
        change width
      </button>
      <button @click="onChangeGridModeClick" :class="{toggled: gridMode}">
        grid mode
      </button>
      <button @click="onChangeIsLoadingClick" :class="{toggled: isLoading}">
        loading
      </button>
    </p>
    <div class="card-boxes">
      <div class="card-box">
        <Card
            title="Card title"
            subtitle="Card subtitle"
            cover-url="/_nuxt/assets/room.jpg"
            cover-description="air conditioned room with a beautiful lakeside view"
            thumbnail-url="/_nuxt/assets/room.jpg"
            @click="onDemoCardClickA"
            :grow="gridMode"
            :is-loading="isLoading"
        >
          <div slot="body">
            Lorem <em>ipsum</em> dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor <strong>incididunt</strong> ut labore et
          </div>
          <div slot="footer">
            Card footer
          </div>
        </Card>
      </div>

      <!-- region variation: no title -->
      <div class="card-box">
        <Card
            cover-url="/_nuxt/assets/room.jpg"
            :grow="gridMode"
            :is-loading="isLoading"
        >
          <div slot="body">
            Lorem ipsum dolor sit amet,
            <a href="https://en.wikipedia.org/wiki/Lorem_ipsum" target="_blank">consectetur</a>
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </div>
          <div slot="footer">
            Card footer
          </div>
        </Card>
      </div>
      <!-- endregion -->

      <!-- region variation: cover under image -->
      <div class="card-box">
        <Card
            title="Card title"
            :cover-under-header="true"
            subtitle="Card subtitle"
            cover-url="/_nuxt/assets/room.jpg"
            thumbnail-url="/_nuxt/assets/room.jpg"
            @click="onDemoCardClickB"
            :grow="gridMode"
            :is-loading="isLoading"
        >
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </div>
          <div slot="footer">
            Card footer
          </div>
        </Card>
      </div>
      <!-- endregion -->

      <!-- region variation: no body -->
      <div class="card-box">
        <Card
            title="Card title"
            :cover-under-header="true"
            subtitle="Card subtitle"
            cover-url="/_nuxt/assets/room.jpg"
            thumbnail-url="/_nuxt/assets/room.jpg"
            :grow="gridMode"
            :is-loading="isLoading"
        >
          <div slot="footer">
            Card footer
          </div>
        </Card>
      </div>
      <!-- endregion -->

      <!-- region variation: only body and footer -->
      <div class="card-box">
        <Card :grow="gridMode"
              :is-loading="isLoading">
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </div>
          <div slot="footer">
            Card footer
          </div>
        </Card>
      </div>
      <!-- endregion -->

      <!-- region variation: only title, thumbnail and body -->
      <div class="card-box">
        <Card
            title="Card title"
            thumbnail-url="/_nuxt/assets/room.jpg"
            :grow="gridMode"
            :is-loading="isLoading"
        >
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </div>
        </Card>
      </div>
      <!-- endregion -->

      <!-- region variation: fixed cover height, no thumbnail -->
      <div class="card-box">
        <Card
            title="Card title"
            subtitle="Card subtitle"
            cover-url="/_nuxt/assets/room.jpg"
            :cover-height="100"
            :grow="gridMode"
            :is-loading="isLoading"
        >
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </div>
          <div slot="footer">
            Card footer
          </div>
        </Card>
      </div>
      <!-- endregion -->

      <!-- region variation: fixed cover height, no titles, image below title -->
      <div class="card-box">
        <Card
            cover-url="/_nuxt/assets/room.jpg"
            :cover-under-header="true"
            :cover-height="100"
            :grow="gridMode"
            :is-loading="isLoading"
        >
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </div>
        </Card>
      </div>
      <!-- endregion -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.root-component {
  padding: 40px;

  &.width-flipped .card-box {
    width: 400px;
  }

  &.zoomed .card-boxes {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    transform: scale(.5);
    transform-origin: top left;
    width: 200%;
  }
}

h1 {
  font-family: 'Lora', serif;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  margin: 0 0 40px 0;
  padding: 0;
}

.controls {
  padding: 0 0 24px 0;
  margin: 0;

  button {
    cursor: pointer;
    border-radius: 3px;
    background-color: silver;
    border: 2px outset gray;
    padding: 5px;

    &.toggled {
      border: 2px inset gray;
      background-color: gray;
    }

    &:hover {
      opacity: .9;
    }
  }
}

.card-boxes {
  border-radius: 4px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.card-box {
  border-radius: 4px;
  padding: 6px;
  width: 320px;
  min-height: 600px;
  transition: all .3s;
  display: flex;
  flex-direction: column;
}

.outlined {
  .card-boxes {
    box-shadow: 0 0 5px inset rgba(0, 0, 255, .2);
  }

  .card-box {
    box-shadow: 0 0 5px inset rgba(255, 0, 0, .2);
  }
}
</style>
<script>
// probably there's a much much nicer way to do this with nuxt and vuex,
// not to mention the fact that quota errors should really be handled
// at least with try-catches, but with the nuxt style auto reloader being a
// broken mess, I still have to press refresh way too often...
const LS_KEY = 'kasa-entry-state';
const storageState = process.browser ? JSON.parse(localStorage.getItem(LS_KEY) || '{}') : {};
const persistable = ['outlined', 'zoomed', 'gridMode', 'widthFlipped', 'isLoading'];

module.exports = {
  data: () => ({
    outlined: false,
    zoomed: false,
    gridMode: false,
    widthFlipped: false,
    isLoading: false
  }),
  mounted () {
    if (process.browser) {
      persistable.forEach(key => this[key] = storageState[key] || this[key]);
    }
  },
  methods: {
    onDemoCardClickA () {
      alert(42);
    },
    onDemoCardClickB () {
      confirm('Open the Pod bay doors? Are you sure?');
    },
    onChangeOutlinedClick () {
      this.outlined = !this.outlined;
    },
    onChangeCardWidthsClick () {
      this.widthFlipped = !this.widthFlipped;
    },
    onChangeGridModeClick () {
      this.gridMode = !this.gridMode;
    },
    onChangeZoomClick () {
      this.zoomed = !this.zoomed;
    },
    onChangeIsLoadingClick () {
      this.isLoading = !this.isLoading;
    },
    persist () {
      if (process.browser) {
        localStorage.setItem(LS_KEY, JSON.stringify(
            persistable.reduce((acc, key) => ({ ...acc, [key]: this[key] }), {})
        ));
      }
    }
  }
};
</script>
