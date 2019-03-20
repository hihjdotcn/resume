var SRC_DIR = './src/'
var DIST_DIR = './docs/'
var DIST_FILES = DIST_DIR + '**'

var Config = {
	src: SRC_DIR,
	dist: DIST_DIR,
	dist_files: DIST_FILES,
	html: {
		src: SRC_DIR + '**/*.html',
		dist: DIST_DIR
	},
	assets: {
		src: SRC_DIR + 'assets/**/*',
		dist: DIST_DIR
	},
	css: {
		src: SRC_DIR + 'css/**/*.css',
		src_min:SRC_DIR + 'css',
		dist:DIST_DIR + 'css'
	},
	less: {
		src: SRC_DIR + 'less/**/*.less',
		dist: DIST_DIR + 'css'
	},
	js: {
		src: SRC_DIR + 'js/**/*.js',
		src_min: SRC_DIR + 'js',
		dist: DIST_DIR + 'js',
		build_name: 'build.js'
	},
	img: {
		src: SRC_DIR + 'images/**/*',
		dist: DIST_DIR + 'images'
	}
}
module.exports = Config