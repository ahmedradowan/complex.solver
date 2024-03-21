document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll(".input");

    inputs.forEach(function(input) {
        input.addEventListener("focus", function() {
            if (this.value === "0") {
                this.value = "";
            }
        });

        input.addEventListener("blur", function() {
            if (this.value === "") {
                this.value = "0";
            }
        });
    });
});

document.getElementById("solveBtn").addEventListener("click", function() {
    var a1_real = parseFloat(document.getElementById("a1_real").value);
    var a1_imaginary = parseFloat(document.getElementById("a1_imaginary").value);
    var b1_real = parseFloat(document.getElementById("b1_real").value);
    var b1_imaginary = parseFloat(document.getElementById("b1_imaginary").value);
    var c1_real = parseFloat(document.getElementById("c1_real").value);
    var c1_imaginary = parseFloat(document.getElementById("c1_imaginary").value);
    var a2_real = parseFloat(document.getElementById("a2_real").value);
    var a2_imaginary = parseFloat(document.getElementById("a2_imaginary").value);
    var b2_real = parseFloat(document.getElementById("b2_real").value);
    var b2_imaginary = parseFloat(document.getElementById("b2_imaginary").value);
    var c2_real = parseFloat(document.getElementById("c2_real").value);
    var c2_imaginary = parseFloat(document.getElementById("c2_imaginary").value);

    var a1 = new Complex(a1_real, a1_imaginary);
    var b1 = new Complex(b1_real, b1_imaginary);
    var c1 = new Complex(c1_real, c1_imaginary);
    var a2 = new Complex(a2_real, a2_imaginary);
    var b2 = new Complex(b2_real, b2_imaginary);
    var c2 = new Complex(c2_real, c2_imaginary);

    var determinant = a1.multiply(b2).subtract(a2.multiply(b1));
    var x = c1.multiply(b2).subtract(c2.multiply(b1)).divide(determinant);
    var y = a1.multiply(c2).subtract(a2.multiply(c1)).divide(determinant);

    var formattedX = formatComplex(x);
    var formattedY = formatComplex(y);

    document.getElementById("result").innerHTML = "x = " + formattedX + "<br>y = " + formattedY;
});

class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add(other) {
        return new Complex(this.real + other.real, this.imaginary + other.imaginary);
    }

    subtract(other) {
        return new Complex(this.real - other.real, this.imaginary - other.imaginary);
    }

    multiply(other) {
        var real = this.real * other.real - this.imaginary * other.imaginary;
        var imaginary = this.real * other.imaginary + this.imaginary * other.real;
        return new Complex(real, imaginary);
    }

    divide(other) {
        var denominator = other.real * other.real + other.imaginary * other.imaginary;
        var real = (this.real * other.real + this.imaginary * other.imaginary) / denominator;
        var imaginary = (this.imaginary * other.real - this.real * other.imaginary) / denominator;
        return new Complex(real, imaginary);
    }

    toString() {
        return this.imaginary >= 0 ? this.real + " + " + this.imaginary + "i" : this.real + " - " + Math.abs(this.imaginary) + "i";
    }
}

function formatComplex(complex) {
    var realPart = complex.real.toFixed(4);
    var imaginaryPart = complex.imaginary.toFixed(4);

    if (imaginaryPart >= 0) {
        return realPart + " + " + imaginaryPart + "i";
    } else {
        return realPart + " - " + Math.abs(imaginaryPart) + "i";
    }
}