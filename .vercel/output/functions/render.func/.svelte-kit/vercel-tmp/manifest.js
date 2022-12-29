export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["avatars/me_1.jpg","avatars/me_10.jpg","avatars/me_11.jpg","avatars/me_12.jpg","avatars/me_13.jpg","avatars/me_14.jpg","avatars/me_15.jpg","avatars/me_16.jpg","avatars/me_17.jpg","avatars/me_18.jpg","avatars/me_19.jpg","avatars/me_2.jpg","avatars/me_20.jpg","avatars/me_3.jpg","avatars/me_4.jpg","avatars/me_5.jpg","avatars/me_6.jpg","avatars/me_7.jpg","avatars/me_8.jpg","avatars/me_9.jpg","bg.png","favicon.png"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-247e207a.js","imports":["_app/immutable/start-247e207a.js","_app/immutable/chunks/index-eaa75a16.js","_app/immutable/chunks/singletons-447b2ece.js","_app/immutable/chunks/index-93733f44.js","_app/immutable/chunks/browser-ponyfill-10e9505f.js","_app/immutable/chunks/db-8e0000c5.js","_app/immutable/chunks/env-public-f7741390.js","_app/immutable/chunks/control-f5b05b5f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js'),
			() => import('../output/server/nodes/10.js'),
			() => import('../output/server/nodes/11.js'),
			() => import('../output/server/nodes/12.js'),
			() => import('../output/server/nodes/13.js'),
			() => import('../output/server/nodes/14.js')
		],
		routes: [
			{
				id: "/(homepage)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/_about",
				pattern: /^\/_about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "/_help",
				pattern: /^\/_help\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "/_legal/terms-and-conditions",
				pattern: /^\/_legal\/terms-and-conditions\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 13 },
				endpoint: null
			},
			{
				id: "/_signup",
				pattern: /^\/_signup\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(app)/app",
				pattern: /^\/app\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(homepage)/checkout",
				pattern: /^\/checkout\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(homepage)/contacts",
				pattern: /^\/contacts\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(homepage)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(homepage)/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(homepage)/payment_success",
				pattern: /^\/payment_success\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
