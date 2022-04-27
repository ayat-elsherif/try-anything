import videojs from "video.js";
var first_play = !1,
  first_item = !0,
  validSeconds = function (e) {
    return "number" == typeof e && !isNaN(e) && e >= 0 && e < 1 / 0;
  },
  reset = function (e) {
    var t = e.playlist.autoadvance_;
    t.timeout && e.clearTimeout(t.timeout);
    t.trigger && e.off("ended", t.trigger);
    t.timeout = null;
    t.trigger = null;
  },
  setup = function e(t, r) {
    reset(t);
    if (validSeconds(r)) {
      t.playlist.autoadvance_.delay = r;
      t.playlist.autoadvance_.trigger = function () {
        var n = function () {
          return e(t, r);
        };
        t.one("play", n);
        t.playlist.autoadvance_.timeout = t.setTimeout(function () {
          reset(t);
          t.off("play", n);
          t.playlist.next();
        }, 1e3 * r);
      };
      t.one("ended", t.playlist.autoadvance_.trigger);
    } else t.playlist.autoadvance_.delay = null;
  },
  playItem = function (e, t) {
    var r = !e.paused() || e.ended();
    t.playlistItemId_ &&
      (e.playlist.currentPlaylistItemId_ = t.playlistItemId_);
    e.changeSrc(t);
    e.trigger("playlist_change", { id: t.playlistItemId_ });
    1 != first_play && (first_play = !0);
    e.ready(function () {
      e.trigger("playlistitem", t.originalValue || t);
      e.trigger("playlist_newitem", { id: t.playlistItemId_ });
      first_item && (first_item = !1);
      if (r) {
        var n = e.play();
        void 0 !== n &&
          "function" == typeof n.then &&
          n.then(null, function (e) {});
      }
      setup(e, e.playlist.autoadvance_.delay);
    });
    return e;
  },
  isItemObject = function (e) {
    return !!e && "object" == typeof e;
  },
  transformPrimitiveItems = function (e) {
    var t,
      r = [];
    e.forEach(function (e) {
      isItemObject(e) ? (t = e) : ((t = Object(e)).originalValue = e);
      r.push(t);
    });
    return r;
  },
  generatePlaylistItemId = function (e) {
    var t = 1;
    e.forEach(function (e) {
      e.playlistItemId_ = t++;
    });
  },
  indexInPlaylistItemIds = function (e, t) {
    for (var r = 0; r < e.length; r++) if (e[r].playlistItemId_ === t) return r;
    return -1;
  },
  sourceEquals = function (e, t) {
    var r = e,
      n = t;
    "object" == typeof e && (r = e.src);
    "object" == typeof t && (n = t.src);
    /^\/\//.test(r) && (n = n.slice(n.indexOf("//")));
    /^\/\//.test(n) && (r = r.slice(r.indexOf("//")));
    return r === n;
  },
  indexInSources = function (e, t) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r].sources;
      if (Array.isArray(n))
        for (var i = 0; i < n.length; i++) {
          var a = n[i];
          if (a && sourceEquals(a, t)) return r;
        }
    }
    return -1;
  };
function factory(e, t, r) {
  void 0 === r && (r = 0);
  var n = null,
    i = !1,
    a = (e.playlist = function (t, r) {
      void 0 === r && (r = 0);
      if (i) throw new Error("do not call playlist() during a playlist change");
      if (Array.isArray(t)) {
        var u = Array.isArray(n) ? n.slice() : null,
          l = t.slice();
        (n = l.slice()).filter(function (e) {
          return isItemObject(e);
        }).length !== n.length && (n = transformPrimitiveItems(n));
        generatePlaylistItemId(n);
        i = !0;
        i = !1;
        -1 !== r && a.currentItem(r);
        u &&
          e.setTimeout(function () {
            e.trigger("playlistchange");
          }, 0);
      }
      return n
        .map(function (e) {
          return e.originalValue || e;
        })
        .slice();
    });
  e.on("loadstart", function () {
    -1 === a.currentItem() && reset(e);
  });
  a.currentIndex_ = -1;
  a.player_ = e;
  a.autoadvance_ = {};
  a.repeat_ = !1;
  a.currentPlaylistItemId_ = null;
  a.currentItem = function (e) {
    if (i) return a.currentIndex_;
    "undefined" == a.currentIndex_ && (a.currentIndex_ = 0);
    if (
      "number" == typeof e &&
      a.currentIndex_ !== e &&
      e >= 0 &&
      e < n.length
    ) {
      a.currentIndex_ = e;
      playItem(a.player_, n[a.currentIndex_]);
      return a.currentIndex_;
    }
    var t = a.player_.currentSrc() || "";
    if (a.currentPlaylistItemId_) {
      var r = indexInPlaylistItemIds(n, a.currentPlaylistItemId_),
        u = n[r];
      if (u && Array.isArray(u.sources) && indexInSources([u], t) > -1) {
        a.currentIndex_ = r;
        return a.currentIndex_;
      }
      a.currentPlaylistItemId_ = null;
    }
    a.currentIndex_ = a.indexOf(t);
    return a.currentIndex_;
  };
  a.contains = function (e) {
    return -1 !== a.indexOf(e);
  };
  a.indexOf = function (e) {
    if ("string" == typeof e) return indexInSources(n, e);
    for (var t = Array.isArray(e) ? e : e.sources, r = 0; r < t.length; r++) {
      var i = t[r];
      if ("string" == typeof i) return indexInSources(n, i);
      if (i.src) return indexInSources(n, i.src);
    }
    return -1;
  };
  a.remove = function (t) {
    if ("number" == typeof t && t < n.length) {
      e.removeFromPlaylist(t);
      n.splice(t, 1);
    }
  };
  a.insert = function (t) {
    if (void 0 !== t.src || void 0 !== t.sources) {
      e.addToPlaylist(t);
      n.push(t);
    }
  };
  a.insertAfter = function (t, r) {
    if (
      (void 0 !== t.src || void 0 !== t.sources) &&
      "number" == typeof r &&
      r <= n.length &&
      r > -1
    ) {
      e.addToPlaylist(t, "after", r);
      n.splice(r + 1, 0, t);
    }
  };
  a.insertBefore = function (t, r) {
    if (
      (void 0 !== t.src || void 0 !== t.sources) &&
      "number" == typeof r &&
      r < n.length &&
      r > -1
    ) {
      e.addToPlaylist(t, "before", r);
      n.splice(r, 0, t);
    }
  };
  a.currentIndex = function () {
    return a.currentItem();
  };
  a.lastIndex = function () {
    return n.length - 1;
  };
  a.nextIndex = function () {
    var e = a.currentItem(),
      t = a.lastIndex();
    return e === t ? 0 : Math.min(e + 1, t);
  };
  a.previousIndex = function () {
    var e = a.currentItem();
    return -1 === e ? -1 : 0 === e ? a.lastIndex() : Math.max(e - 1, 0);
  };
  a.first = function () {
    if (!i) {
      var e = a.currentItem(0);
      if (n.length) return n[e].originalValue || n[e];
      a.currentIndex_ = -1;
    }
  };
  a.last = function () {
    var e = a.currentItem(a.lastIndex());
    if (n.length) return n[e].originalValue || n[e];
    a.currentIndex_ = -1;
  };
  a.next = function () {
    if (!i && !e.adPlaying) {
      var t = a.nextIndex();
      if (t !== a.currentIndex_) {
        var r = a.currentItem(t);
        return n[r].originalValue || n[r];
      }
    }
  };
  a.new = function (t) {
    n = t;
    e.newPlaylist(n);
  };
  a.previous = function () {
    if (!i && !e.adPlaying) {
      var t = a.previousIndex();
      if (t !== a.currentIndex_) {
        var r = a.currentItem(t);
        return n[r].originalValue || n[r];
      }
    }
  };
  a.autoadvance = function (e) {
    setup(a.player_, e);
  };
  a.repeat = function (e) {
    if (void 0 === e) return a.repeat_;
    if ("boolean" == typeof e) {
      a.repeat_ = !!e;
      return a.repeat_;
    }
    videojs.log.error("videojs-playlist: Invalid value for repeat", e);
  };
  a.list = function () {
    return n;
  };
  a.sort = function (e) {
    n.length && n.sort(e);
  };
  Array.isArray(t) ? a(t.slice(), r) : (n = []);
  return a;
}
var registerPlugin = videojs.registerPlugin || videojs.plugin,
  plugin = function (e, t) {
    this.ready(function () {
      factory(this, e, t);
      this.playlist.autoadvance(0);
      this.trigger("playlistready");
    });
  };
registerPlugin("playlist", plugin);
export default plugin;
