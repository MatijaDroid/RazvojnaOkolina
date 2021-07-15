const
    // dev mode?  dali sam u development modu?
    devBuild = false, //kad je dev stavimo true, kad je produkcija onda je false
    noop = require('gulp-noop')
    sass = require('gulp-sass') (require('sass')),
    concate = require('gulp-concat'),
    // modules (moramo dodati koji moduli odrađuju taskove, dodajemo ih u konstante)
    gulp = require('gulp'),
    htmlclean = require('gulp-htmlclean')
    //folders (razdvajanje)
    src = 'src/', // source kod u kojem radimo
    build = 'build/'; //build koji je produkcijski

//HTML processing
function html(){

    return gulp.src( src + 'html/**/*') // uvijek kad korisitimo gulp stavimo return prvo pa gulp, /**/* - ovo znači uđi u folder i odaberi fileove
                .pipe(devBuild ? noop() : htmlclean()) //ako je devBuild true odradi noop a ako je false onda odradi htmlclean()
                .pipe(gulp.dest(build));
}

// CSS procesiranje

function css(){
    const out = build + 'assets/css'; //putanja gdje želimo css u build mapi
    return gulp.src( [
                'node_modules/bootstrap/scss/bootstrap.scss',
                src + 'sass/main.scss'
            ]) // /**/* - ne ostavljamo  ovo za sass to mijenjamo sa main.scss (veći broj filova u array) kod bootstrapa možemo uzeti pojedni scss ili cijeli
                .pipe(sass().on('error', sass.logError)) //na message error vraća logError
                .pipe(concate('bundle.css'))
                .pipe(gulp.dest(out));

}

function watch(done){

    gulp.watch(src + 'html/**/*', html); // gulp metoda
    gulp.watch(src + 'sass/**/*', html);
    done();
}

exports.html = html;
exports.css = css;
exports.watch = watch;

exports.build = gulp.parallel(exports.html = html, exports.css = css); //metoda parallel nad gulpom s kojom automatski pokrenemo sve
//ime taska = ime funkcije
exports.default = gulp.series(exports.build, exports.watch);
// poziv default funkcije

