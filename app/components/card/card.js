const card = (() => {

    const init = (component) => {

        let text = component.getElementsByClassName('info')[0].textContent;        

        component.getElementsByClassName('alert')[0].addEventListener('click', (event) => {
            event.preventDefault();
            console.log(text);
        });

        console.log('APP.card');
    }

    return {
        init,
        name: 'card'
    }

})();

export { card }