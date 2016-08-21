var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('concatJs',function(){
    //取到指定目录下指定的js文件，排除以tmp.js结尾的
    gulp.src(['./src/javascript/*.js','!./src/javascript/*.tmp.js'])
        .pipe($.concat('all.js'))/*多个文件合并成一个文件*/
        .pipe($.uglify())/*js专用压缩*/
        .pipe(gulp.dest('./build/js'));/*合并压缩后存到指定文件夹*/
});

gulp.task('concatCss',function(){
    //取到指定目录下指定的js文件，排除以tmp.js结尾的
    gulp.src(['./src/css/*.css','!./src/css/*.tmp.css'])
        .pipe($.concat('all.css'))/*多个文件合并成一个文件*/
        //.pipe($.uglify())/*压缩*/
        .pipe(gulp.dest('./build/css'));/*合并压缩后存到指定文件夹*/
});

//先合并再保存，再压缩，再重命名，再保存
gulp.task('concatJs2',function(){
    //取到指定目录下指定的js文件，排除以tmp.js结尾的
    gulp.src(['./src/javascript/*.js','!./src/javascript/*.tmp.js'])
        .pipe($.concat('all.js'))/*多个文件合并成一个文件*/
        .pipe(gulp.dest('./build/js'))
        .pipe($.uglify())/*js专用压缩*/
        .pipe($.rename('all.min.js'))
        .pipe(gulp.dest('./build/js'));/*合并压缩后存到指定文件夹*/
});

gulp.task('lessConcatToCss',function(){
    //取到指定目录下指定的js文件，排除以tmp.js结尾的
    gulp.src(['./src/less/*.less'])
        .pipe($.less())//less文件转为css文件
        .pipe($.concat('all.css'))//合并成一个文件
        .pipe(gulp.dest('./build/css'))//保存合并后的文件
        .pipe($.minifyCss())//压缩css文件
        .pipe($.rename('all.min.css'))//重命名压缩后的文件
        .pipe(gulp.dest('./build/css'));//重新输出压缩后的文件
});

gulp.task('toMiniHtml',function(){//一般页面不会合并，大多是压缩
    gulp.src('./src/html/base.html')
    .pipe($.minifyHtml())
    .pipe(gulp.dest('./build/html'))
});

gulp.task('toMiniImg',function(){//压缩图片
    gulp.src('./src/image/*.{jpg,png,bmp}')
        .pipe($.imagemin())
        .pipe(gulp.dest('./build/img'))
});






