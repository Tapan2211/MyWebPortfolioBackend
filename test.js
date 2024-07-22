(function () {
    var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined')); op: false
console.log("b defined? " + (typeof b !== 'undefined')); op: true

var myObject = {
    foo: "bar",
    func: function () {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function () {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();

//1 console.log("outer func:  this.foo = " + this.foo);  output :  bar
//2  onsole.log("outer func:  self.foo = " + self.foo); output : bar
//3 console.log("inner func:  this.foo = " + this.foo); output : undefine
//4 console.log("inner func:  self.foo = " + self.foo); output : bar 

