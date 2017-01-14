var gulp = require('gulp'), // ����������gulp���
    clean = require('gulp-clean'),  // �ļ�ɾ��
    less = require('gulp-less'), // less ����
    gutil = require('gulp-util'),// ����̨��ɫ
    cached = require('gulp-cached'), // ���浱ǰ�����е��ļ���ֻ�����޸ĵ��ļ�ͨ���ܵ�
    uglify = require('gulp-uglify'), // js ѹ��
    rename = require('gulp-rename'), // ������
    concat = require('gulp-concat'), // �ϲ��ļ�
    notify = require('gulp-notify'), // �޸�����
    cssnano = require('gulp-cssnano'), // CSS ѹ��
    imagemin = require('gulp-imagemin'), // ͼƬ�Ż�
    browserSync = require('browser-sync'), // �����Զ�ˢ��
    autoprefixer = require('gulp-autoprefixer');// ��� CSS �����ǰ׺

//--------------------------common  tasks-----------------------------

//����less--���������ļ�������ӦĿ¼
gulp.task('lessLocal', function() {
    return gulp.src('src/css/*.less',{base:'./src'})
    .pipe(cached('less'))
    .pipe(less())
    .pipe(autoprefixer('last 6 version'))
    .pipe(gulp.dest('src'));
});



//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//����lessEclipse���������뿪��������������tomcat��eclipse��Ӧ��ĿĿ¼��
gulp.task('lessEclipse', function() {
    return gulp.src('src/cssEclispe/*.less',{base:'./src'})
    .pipe(cached('less'))
    .pipe(less())
    .pipe(autoprefixer('last 6 version'))
    .pipe(gulp.dest('src'));
});

gulp.task('distCopyEclipse',function(){
    return gulp.src('src/cssEclispe/*',{nodir:true})
    .pipe(cached('distCopyEclipse'))
    .pipe(gulp.dest('D:/workSpace/makerplateform/webapp/instantcommunication/theme/css'))
    .pipe(gulp.dest('D:/tomcat7/webapps/makerplateform/instantcommunication/theme/css'));
});
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||





//distCopy
gulp.task('distCopy',function(){
    return gulp.src('src/**/*',{base:'./src'})
    .pipe(cached('distCopy'))
    .pipe(gulp.dest('dist'));
});

//ͼƬѹ��
gulp.task('imgmin', function() {
    return gulp.src('src/img/**/*.{jpg,jpeg,png,gif}',{base:'./src'})
    .pipe(cached('imgmin'))
    // ȡֵ��Χ��0-7���Ż��ȼ���,�Ƿ�����ѹ��jpgͼƬ���Ƿ����ɨ��gif������Ⱦ���Ƿ����Ż�svgֱ����ȫ�Ż�
    .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true, multipass: true}))
    .pipe(gulp.dest('dist'));
});

//cssѹ��
gulp.task('cssmin', function() {
    return gulp.src(['src/**/*.css','!src/**/*.min.css','!src/lib/**/*.css'],{base:'./src'})
    .pipe(cached('cssmin'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
});

//jsmin
gulp.task('jsmin', function() {
    return gulp.src(['src/js/*.js','!src/js/*.min.js'],{base:'./src'})
    .pipe(cached('jsmin'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

//��������
gulp.task('distMin', 
    gulp.series('lessLocal','distCopy',
        gulp.parallel('imgmin','cssmin','jsmin')
    )
);
gulp.task('distUnMin', 
    gulp.series('distCopy',
        gulp.parallel('imgmin')
    )
);


//---------------------- server  tasks-------------------------
//�����ˢ��    
gulp.task('default', function() {  
    browserSync.init({  
        //ָ��������������Ŀ¼
        server: "./src"
    });  
    // gulp.watch('src/css/*.less',gulp.series('lessLocal'));
    gulp.watch('src/cssEclispe/*.less',gulp.series('lessEclipse','distCopyEclipse'));
    gulp.watch("./src/**/*.*").on('change',browserSync.reload);
});