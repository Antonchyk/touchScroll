function Scroll(wrapper) {

    var self = this,
        scrollTouchStartY = 0,
        content = wrapper.childNodes[1];

    content.style.webkitTransform = 'translate(0px, 0px) translateZ(0px)';
    content.style.webkitTransition = '0s';

    /**
     * Attaching events for custom srcolling
     */
    content.addEventListener(
        'touchstart',
        function(event){
            startScroll(event);
        },
        false
    );

    content.addEventListener(
        'touchmove',
        function(event){
            moveScroll(event);
        },
        false
    );

    content.addEventListener(
        'touchend',
        function(event){
            stopScroll(event)
        },
        false
    );

    /*
     *
     * Private methods
     *
     * */
    function startScroll(event){

        if(event.touches.length > 1) return;

        var touch = event.targetTouches[0];

        scrollTouchStartY = touch.pageY - parseInt(content.style.webkitTransform.replace(/^.*?\,(.*?)px.*?$/, '$1' ));
        console.log(content.style.webkitTransform.replace(/^.*?\,(.*?)px.*?$/, '$1' ));
        event.stopPropagation();
        event.preventDefault();

    }


    function moveScroll(event){

        if(event.touches.length > 1) return;

        var touch = event.targetTouches[0],
            translateY = touch.pageY - scrollTouchStartY;

        content.style.webkitTransform = 'translate(0px, ' + translateY + 'px) translateZ(0px)';

        event.stopPropagation();
        event.preventDefault();

    }

    function stopScroll(event){

        var elemTop = parseInt(content.style.webkitTransform.replace(/^.*?\,(.*?)px.*?$/, '$1' )),
            scrollOffset = content.offsetHeight - Math.abs(elemTop),
            topMaxScrollOffset = wrapper.offsetHeight - content.offsetHeight;

        if(elemTop > 0 || content.offsetHeight < wrapper.offsetHeight) {

            content.style.webkitTransform = 'translate(0px, 0px) translateZ(0px)';

        }else if(scrollOffset <= wrapper.offsetHeight) {

            content.style.webkitTransform = 'translate(0px, ' + topMaxScrollOffset + 'px) translateZ(0px)';

        }

        content.style.webkitTransitionDuration = '.3s';
        setTimeout(function(){
            content.style.webkitTransitionDuration = '0s'
        },300);

        event.stopPropagation();
        event.preventDefault();
    }


    /**
     *
     * Public Methods
     *
     */
    return {

        scrollTo: function(posY){

            content.style.webkitTransitionDuration = '.3s';
            content.style.webkitTransform = 'translate(0px, ' + posY + 'px) translateZ(0px)';

            setTimeout(function(){
                content.style.webkitTransitionDuration = '0s'
            },300);

        }

    }
}