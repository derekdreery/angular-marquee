angular.module('angular-marquee', [])
/** 
  * A directive for ticker text (rotating text)
  */
.directive('marquee', ['$interval', function($interval) {
    return {
        restrict: 'A',
        transclude: true,
        template: '<span ng-transclude></span>',
        scope: {},
        link: function(scope, element, attrs) {
            var child = element.children(), // the span
                interval = 100,
                speed = 2,
                hnd_interval,
                current_position,
                direction = 0; // sign is direction

            function animate() {
                current_position = 0;
                hnd_interval = $interval(function() {
                    var difference = element.width() - child.width();
                    // if we're at zero and the element is big enough, do nothing
                    if(current_position === 0 && difference > 0) {
                        direction = 0;
                    // if we're currently below 0 and the difference
                    } else if(current_position <= Math.min(0, difference)) {
                        direction = 1;
                    // if we're currently above 0 and the difference
                    } else if (current_position >= Math.max(0, difference)) {
                        direction = -1; 
                    }
                    current_position += speed * direction;
                    child.css({
                        left: current_position+'px'
                    });
                }, interval);
            }

            element.css({
                display: 'block',
                width: '100%',
                overflow: 'hidden'
            });
            child.css({
                position: 'relative',
                'white-space': 'nowrap'
            });

            animate();
        }
    };
}]);

