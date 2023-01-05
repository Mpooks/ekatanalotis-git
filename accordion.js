document.addEventListener("DOMContentLoaded", function(event) {
    var acc = document.getElementsByClassName("first-level-menu");
    var panel = document.getElementsByClassName('first-level-panel');
    for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
    var setClasses = !this.classList.contains('active');
    setClass(acc, 'active', 'remove');
    setClass(panel, 'show', 'remove');
    if (setClasses) {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
    console.log('ax travixtika  ')
    }
    }
    }
    function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
    }
    }
    });

document.addEventListener("DOMContentLoaded", function(event) {
    var acc = document.getElementsByClassName("second-level-menu");
    var panel = document.getElementsByClassName('second-level-panel');
    for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
    var setClasses = !this.classList.contains('active');
    setClass(acc, 'active', 'remove');
    setClass(panel, 'show', 'remove');
    if (setClasses) {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
    console.log('ax de travixtika  ')
    }
    }
    }
    function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
    }
    }
    });

    document.addEventListener("DOMContentLoaded", function(event) {
        var acc = document.getElementsByClassName("third-level-menu");
        var panel = document.getElementsByClassName('third-level-panel');
        for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
        var setClasses = !this.classList.contains('active');
        setClass(acc, 'active', 'remove');
        setClass(panel, 'show', 'remove');
        if (setClasses) {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
        console.log('ax de travixtika  ')
        }
        }
        }
        function setClass(els, className, fnName) {
        for (var i = 0; i < els.length; i++) {
        els[i].classList[fnName](className);
        }
        }
        });





    



