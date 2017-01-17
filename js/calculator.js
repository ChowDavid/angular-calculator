var myApp = angular.module('CalculatorApp', []);

myApp.controller('CalculatorController', ['$scope', function ($scope) {
    $scope.reset = function () {
        this._a = 0;
        this._b = NaN;
        this._dot = false;
        this._operator = null;
        $scope.result = this._a;

        console.log("Reset");
    };
    $scope.number = function (value) {
        if (this._a.toString().length<15) {
            if (this._a == 0) {
                this._a = value;
            } else {
                this._a = this._a.toString() + value;
            }

            $scope.result = this._a;
        }
    };
    $scope.dot = function () {
        if (!this._dot) {
            this._a = this._a.toString() + ".";
            this._dot = true;
            $scope.result = this._a;
        }
        console.log("dot");
    };

    $scope._calculate = function () {
        if (!Number.isNaN(this._b)) {
            if (Number.isNaN(this._b)) {
                this._b = this._a;
            }
            switch (this._operator) {
            case '+':
                this._a = parseFloat(this._a) + parseFloat(this._b);
                break;
            case '-':
                this._a = parseFloat(this._b) - parseFloat(this._a);
                break;
            case '*':
                this._a = parseFloat(this._a) * parseFloat(this._b);
                break;
            case '/':
                this._a = parseFloat(this._b) / parseFloat(this._a);
                break;
            case '^':
                this._a = Math.pow(parseFloat(this._b), parseFloat(this._a));
                break;

            }
            console.log("calculate A=" + this._a + " B=" + this._b + " operator=" + this._operator);
            $scope.result = this._a;
        }
    }


    $scope.operator = function (value) {
        console.log("Operator " + value);
        switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
            $scope._calculate();
            this._b = this._a;
            this._a = 0;
            this._dot = false;
            this._operator = value;
            console.log("A=" + this._a + " B=" + this._b);
            break;
        case '=':
            $scope._calculate();
            this._b = NaN;
            this._operator = null;
            break;
        case 'root':
            this._a = Math.sqrt(Number.parseFloat(this._a));
            $scope.result = this._a;
            break;
        }


    };

    }]);