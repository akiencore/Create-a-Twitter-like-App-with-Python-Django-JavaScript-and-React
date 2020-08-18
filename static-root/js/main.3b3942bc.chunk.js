(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      e.exports = n.p + "static/media/logo.5d5d9eef.svg";
    },
    ,
    ,
    function (e, t, n) {
      e.exports = n(17);
    },
    ,
    ,
    ,
    ,
    function (e, t, n) {},
    function (e, t, n) {},
    function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n(0),
        r = n.n(a),
        c = n(4),
        o = n.n(c),
        l = (n(15), n(7)),
        i = n.n(l),
        s = (n(16), n(3)),
        u = n(1);
      function m(e, t, n, a) {
        var r;
        a && (r = JSON.stringify(a));
        var c = new XMLHttpRequest(),
          o = "http://localhost:80/api".concat(t);
        (c.responseType = "json"), c.open(e, o);
        var l = (function (e) {
          var t = null;
          if (document.cookie && "" !== document.cookie)
            for (var n = document.cookie.split(";"), a = 0; a < n.length; a++) {
              var r = n[a].trim();
              if (r.substring(0, e.length + 1) === e + "=") {
                t = decodeURIComponent(r.substring(e.length + 1));
                break;
              }
            }
          return t;
        })("csrftoken");
        c.setRequestHeader("Content-Type", "application/json"),
          l &&
            (c.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            c.setRequestHeader("X-CSRFToken", l)),
          (c.onload = function () {
            403 === c.status &&
              "Authentication credentials were not provided." ===
                c.response.detail &&
              (window.location.href = "/login?showLoginRequired=true");
            n(c.response, c.status);
          }),
          (c.onerror = function (e) {
            console.log("error", e),
              n({ message: "The request was an error" }, 400);
          }),
          c.send(r);
      }
      var d = n(8),
        p = (n(18), n(5), n(9));
      function f(e) {
        var t = e.tweet,
          n = e.action,
          a = e.didPerformAction,
          c = t.likes ? t.likes : 0,
          o = e.className ? e.className : "btn btn-primary btn-sm",
          l = n.display ? n.display : "Action",
          i = function (e, t) {
            console.log(e, t), (200 !== t && 201 !== t) || !a || a(e, t);
          },
          s = "like" === n.type ? "".concat(c, " ").concat(l) : l;
        return r.a.createElement(
          "button",
          {
            className: o,
            onClick: function (e) {
              e.preventDefault(),
                (function (e, t, n) {
                  m("POST", "/tweets/action/", n, { id: e, action: t });
                })(t.id, n.type, i);
            },
          },
          s
        );
      }
      function w(e, t) {
        w = function (e, t) {
          return new c(e, void 0, t);
        };
        var n = Object(p.a)(RegExp),
          a = RegExp.prototype,
          r = new WeakMap();
        function c(e, t, a) {
          var c = n.call(this, e, t);
          return r.set(c, a || r.get(e)), c;
        }
        function o(e, t) {
          var n = r.get(t);
          return Object.keys(n).reduce(function (t, a) {
            return (t[a] = e[n[a]]), t;
          }, Object.create(null));
        }
        return (
          Object(d.a)(c, n),
          (c.prototype.exec = function (e) {
            var t = a.exec.call(this, e);
            return t && (t.groups = o(t, this)), t;
          }),
          (c.prototype[Symbol.replace] = function (e, t) {
            if ("string" === typeof t) {
              var n = r.get(this);
              return a[Symbol.replace].call(
                this,
                e,
                t.replace(/\$<([^>]+)>/g, function (e, t) {
                  return "$" + n[t];
                })
              );
            }
            if ("function" === typeof t) {
              var c = this;
              return a[Symbol.replace].call(this, e, function () {
                var e = [];
                return (
                  e.push.apply(e, arguments),
                  "object" !== typeof e[e.length - 1] && e.push(o(e, c)),
                  t.apply(this, e)
                );
              });
            }
            return a[Symbol.replace].call(this, e, t);
          }),
          w.apply(this, arguments)
        );
      }
      function b(e) {
        var t = e.tweet;
        return t.parent
          ? r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(
                "div",
                { className: "col-11 mx-auto p-3 border rounded" },
                r.a.createElement(
                  "p",
                  { className: "mb-0 text-muted small" },
                  "Retweet"
                ),
                r.a.createElement(v, {
                  hideActions: !0,
                  className: " ",
                  tweet: t.parent,
                })
              )
            )
          : null;
      }
      function v(e) {
        var t = e.tweet,
          n = e.didRetweet,
          c = e.hideActions,
          o = Object(a.useState)(e.tweet ? e.tweet : null),
          l = Object(u.a)(o, 2),
          i = l[0],
          s = l[1],
          m = e.className ? e.className : "col-10 mx-auto col-md-6",
          d = window.location.pathname.match(w(/([0-9]+)/, { tweetid: 1 })),
          p = d ? d.groups.tweetid : -1,
          v = "".concat(t.id) === "".concat(p),
          h = function (e, t) {
            200 === t ? s(e) : 201 === t && n && n(e);
          };
        return r.a.createElement(
          "div",
          { className: m },
          r.a.createElement(
            "div",
            null,
            r.a.createElement("p", null, t.id, " - ", t.content),
            r.a.createElement(b, { tweet: t })
          ),
          r.a.createElement(
            "div",
            { className: "btn btn-group" },
            i &&
              !0 !== c &&
              r.a.createElement(
                r.a.Fragment,
                null,
                r.a.createElement(f, {
                  tweet: i,
                  didPerformAction: h,
                  action: { type: "like", display: "Likes" },
                }),
                r.a.createElement(f, {
                  tweet: i,
                  didPerformAction: h,
                  action: { type: "unlike", display: "Unlike" },
                }),
                r.a.createElement(f, {
                  tweet: i,
                  didPerformAction: h,
                  action: { type: "retweet", display: "Retweet" },
                })
              ),
            !0 === v
              ? null
              : r.a.createElement(
                  "button",
                  {
                    className: "btn btn-outline-primary btn-sm",
                    onClick: function (e) {
                      e.preventDefault(),
                        (window.location.href = "/".concat(t.id));
                    },
                  },
                  "View"
                )
          )
        );
      }
      function h(e) {
        var t = Object(a.useState)([]),
          n = Object(u.a)(t, 2),
          c = n[0],
          o = n[1],
          l = Object(a.useState)([]),
          i = Object(u.a)(l, 2),
          d = i[0],
          p = i[1],
          f = Object(a.useState)(!1),
          w = Object(u.a)(f, 2),
          b = w[0],
          h = w[1];
        Object(a.useEffect)(
          function () {
            var t = Object(s.a)(e.newTweets).concat(c);
            t.length !== d.length && p(t);
          },
          [e.newTweets, d, c]
        ),
          Object(a.useEffect)(
            function () {
              if (!1 === b) {
                !(function (e, t) {
                  var n = "/tweets/";
                  e && (n = "/tweets/?username=".concat(e)), m("GET", n, t);
                })(e.username, function (e, t) {
                  200 === t ? (o(e), h(!0)) : alert("There was an error");
                });
              }
            },
            [c, b, h, e.username]
          );
        var E = function (e) {
          var t = Object(s.a)(c);
          t.unshift(e), o(t);
          var n = Object(s.a)(d);
          n.unshift(d), p(n);
        };
        return d.map(function (e, t) {
          return r.a.createElement(v, {
            tweet: e,
            didRetweet: E,
            className: "my-5 py-5 border bg-white text-dark",
            key: "".concat(t, "-{item.id}"),
          });
        });
      }
      function E(e) {
        var t = r.a.createRef(),
          n = e.didTweet,
          a = function (e, t) {
            201 === t
              ? n(e)
              : (console.log(e), alert("An error occured please try again"));
          };
        return r.a.createElement(
          "div",
          { className: e.className },
          r.a.createElement(
            "form",
            {
              onSubmit: function (e) {
                e.preventDefault();
                var n = t.current.value;
                console.log("new value", n),
                  m("POST", "/tweets/create/", a, { content: n }),
                  (t.current.value = "");
              },
            },
            r.a.createElement("textarea", {
              ref: t,
              required: !0,
              className: "form-control",
              name: "tweet",
            }),
            r.a.createElement(
              "button",
              { type: "submit", className: "btn btn-primary my-3" },
              "Tweet"
            )
          )
        );
      }
      function g(e) {
        var t = Object(a.useState)([]),
          n = Object(u.a)(t, 2),
          c = n[0],
          o = n[1],
          l = "false" !== e.canTweet;
        return r.a.createElement(
          "div",
          { className: e.className },
          !0 === l &&
            r.a.createElement(E, {
              didTweet: function (e) {
                var t = Object(s.a)(c);
                t.unshift(e), o(t);
              },
              className: "col-12 mb-3",
            }),
          r.a.createElement(h, Object.assign({ newTweets: c }, e))
        );
      }
      function y(e) {
        var t = e.tweetId,
          n = Object(a.useState)(!1),
          c = Object(u.a)(n, 2),
          o = c[0],
          l = c[1],
          i = Object(a.useState)(null),
          s = Object(u.a)(i, 2),
          d = s[0],
          p = s[1],
          f = function (e, t) {
            200 === t ? p(e) : alert("There was an error finding your tweet.");
          };
        return (
          Object(a.useEffect)(
            function () {
              !1 === o &&
                (!(function (e, t) {
                  m("GET", "/tweets/".concat(e, "/"), t);
                })(t, f),
                l(!0));
            },
            [t, o, l]
          ),
          null === d
            ? null
            : r.a.createElement(v, { tweet: d, className: e.className })
        );
      }
      var j = function () {
        return r.a.createElement(
          "div",
          { className: "App" },
          r.a.createElement(
            "header",
            { className: "App-header" },
            r.a.createElement("img", {
              src: i.a,
              className: "App-logo",
              alt: "logo",
            }),
            r.a.createElement(
              "p",
              null,
              "Edit ",
              r.a.createElement("code", null, "src/App.js"),
              " and save to reload."
            ),
            r.a.createElement("div", null, r.a.createElement(g, null)),
            r.a.createElement(
              "a",
              {
                className: "App-link",
                href: "https://reactjs.org",
                target: "_blank",
                rel: "noopener noreferrer",
              },
              "Learn React"
            )
          )
        );
      };
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      var O = document.getElementById("root");
      O && o.a.render(r.a.createElement(j, null), O);
      var N = r.a.createElement,
        k = document.getElementById("tweetme-2");
      if (k) {
        var R = N(g, k.dataset);
        o.a.render(R, k);
      }
      document.querySelectorAll(".tweetme-2-detail").forEach(function (e) {
        o.a.render(N(y, e.dataset), e);
      }),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            });
    },
  ],
  [[10, 1, 2]],
]);
//# sourceMappingURL=main.3b3942bc.chunk.js.map
