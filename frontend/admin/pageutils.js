HTMLElement.prototype.show = function() {
    this.removeAttribute("hidden");
}

HTMLElement.prototype.hide = function() {
    this.setAttribute("hidden", "");
}

function switchTo(page) {
    lastPage = page;
    document.querySelectorAll(".page").forEach(function(p) {
        p.hide();
    });
    page.show();
}

Number.prototype.formatPrice = function(plus=false) {
    var num = this;
    num = Math.floor(num*100)/100;
    if (num<0) {
        return "-$" + (twoDecimalDigits(-num));
    } else if (plus) {
        return "+$" + twoDecimalDigits(num);
    } else {
        return "$" + twoDecimalDigits(num);
    }
}

function twoDecimalDigits(num) {
    var fixed = num.toFixed(2);

    // if the number ends with .00, remove it
    if (fixed.endsWith(".00")) {
        fixed = fixed.slice(0, -3);
    }

    return fixed;
}

function timestampToDateString(timestamp) {
    var date = new Date(timestamp);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return `${month}/${day}/${year}`;
}