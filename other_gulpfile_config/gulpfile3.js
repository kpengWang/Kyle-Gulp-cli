var gulp  = require('gulp');

var sass = require('gulp-sass');//����sass
var cssMin = require('gulp-minify-css');//ѹ��css
var imageMin = require('gulp-imagemin');//ѹ��ͼƬ
var rev = require('gulp-rev');//MD5
var htmlmin = require('gulp-htmlmin');//ѹ��html

var rev = require('gulp-rev');//MD5
var revCollector = require('gulp-rev-collector');//�滻ʱ���


gulp.task('sass',function(){
    return gulp.src('./SASS/*.scss')
                .pipe(sass())
                .pipe(cssMin())
                .pipe(rev())
                .pipe(gulp.dest('dist/stylesheet'))
                .pipe( rev.manifest() )
                .pipe( gulp.dest( 'rev/stylesheet' ) );
});

gulp.task('imagemin', function () {
    return gulp.src('./images/*.{png,jpg,gif,ico}')
                .pipe(imageMin({
                    optimizationLevel: 5, //���ͣ�Number  Ĭ�ϣ�3  ȡֵ��Χ��0-7���Ż��ȼ���
                    progressive: true, //���ͣ�Boolean Ĭ�ϣ�false ����ѹ��jpgͼƬ
                    interlaced: true, //���ͣ�Boolean Ĭ�ϣ�false ����ɨ��gif������Ⱦ
                    multipass: true //���ͣ�Boolean Ĭ�ϣ�false ����Ż�svgֱ����ȫ�Ż�
                }))
                .pipe(rev())
                .pipe(gulp.dest('dist/images'))
                .pipe(rev.manifest())                                   //- ����һ��rev-manifest.json
                .pipe(gulp.dest('./rev/images'));
});

gulp.task('revCollector',['revCollectorCss'], function () {
    var options = {
        removeComments: true,  //���HTMLע��
        collapseWhitespace: true,  //ѹ��HTML
        collapseBooleanAttributes: true,  //ʡ�Բ������Ե�ֵ <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //ɾ�����пո�������ֵ <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //ɾ��<script>��type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //ɾ��<style>��<link>��type="text/css"
        minifyJS: true,  //ѹ��ҳ��JS
        minifyCSS: true  //ѹ��ҳ��CSS
    };
    return gulp.src(['rev/**/*.json', './*.html'])
            .pipe( revCollector())
            .pipe(htmlmin(options))
            .pipe( gulp.dest('dist/'));
});
gulp.task('revCollectorCss',['sass','imagemin'], function () {
    return gulp.src(['rev/**/*.json', './dist/stylesheet/*.css'])
                .pipe(revCollector())
                .pipe(gulp.dest('dist/stylesheet'));
});

gulp.task('auto', function () {
    gulp.watch('./SASS/*.scss', ['sass']);
});

gulp.task('default', [ 'auto','revCollector']);