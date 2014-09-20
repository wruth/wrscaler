(function ($) {
    /*
        ======== A Handy Little QUnit Reference ========
        http://api.qunitjs.com/

        Test methods:
            module(name, {[setup][ ,teardown]})
            test(name, callback)
            expect(numberOfAssertions)
            stop(increment)
            start(decrement)
        Test assertions:
            ok(value, [message])
            equal(actual, expected, [message])
            notEqual(actual, expected, [message])
            deepEqual(actual, expected, [message])
            notDeepEqual(actual, expected, [message])
            strictEqual(actual, expected, [message])
            notStrictEqual(actual, expected, [message])
            throws(block, [expected], [message])
    */

    module('jQuery#wrscaler', {
        // This will run before each test in this module.
        setup: function () {
          this.elems = $('#qunit-fixture').children();
        }
    });

    test('is chainable', function () {
        expect(1);
        // Not a bad test to run on collection methods.
        strictEqual(this.elems.wrscaler(), this.elems, 'should be chainable');
    });

    test('manages transform', function () {
        expect(2);
        var $preExisting = $('#pre-existing-transform'),
            origTransform = $preExisting.css('transform'),
            wrscaler = $preExisting.wrscaler({threshold: 5000}).data('wrscaler');

        notStrictEqual(origTransform, $preExisting.css('transform'), 'should change transform');

        wrscaler.destroy();

        strictEqual(origTransform, $preExisting.css('transform'), 'should reset transform');
    });

    test('no activation', function () {
        expect(1);
        var $preExisting = $('#pre-existing-transform'),
            origTransform = $preExisting.css('transform'),
            wrscaler = $preExisting.wrscaler({threshold: 10}).data('wrscaler');

        strictEqual(origTransform, $preExisting.css('transform'), 'should not change transform');

        wrscaler.destroy();
    });



}(jQuery));
