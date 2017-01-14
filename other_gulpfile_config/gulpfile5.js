/ ���� gulp�����
var gulp=require('gulp'),  //gulp������
    minifycss=require('gulp-minify-css'),   //cssѹ��
    concat=require('gulp-concat'),   //�ϲ��ļ�
    uglify=require('gulp-uglify'),   //jsѹ��
    rename=require('gulp-rename'),   //�ļ�������
    jshint=require('gulp-jshint'),   //js���
    notify=require('gulp-notify');   //��ʾ

gulp.task('default',function(){
    gulp.start('minifycss','minifyjs');
});
 
//css����
gulp.task('minifycss',function(){
   return gulp.src('htdocs/kunpeng/static/css/*.css')      //����css
       .pipe(concat('order_query.css'))      //�ϲ�css�ļ���"order_query"
       .pipe(gulp.dest('dist/styles'))           //�������·��
       .pipe(rename({suffix:'.min'}))         //�޸��ļ���
       .pipe(minifycss())                    //ѹ���ļ�
       .pipe(gulp.dest('dist/styles'))            //����ļ�Ŀ¼
       .pipe(notify({message:'css task ok'}));   //��ʾ�ɹ�
});

//JS����
gulp.task('minifyjs',function(){
   return gulp.src(['/static/js/juicer-min.js','/static/js/bootstrap.min.js','/static/js/bootstrap-datetimepicker.min.js','/static/js/order_query.js'])  //ѡ��ϲ���JS
       .pipe(concat('order_query.js'))   //�ϲ�js
       .pipe(gulp.dest(''dist/js'))         //���
       .pipe(rename({suffix:'.min'}))     //������
       .pipe(uglify())                    //ѹ��
       .pipe(gulp.dest('dist/js'))            //��� 
       .pipe(notify({message:"js task ok"}));    //��ʾ
});