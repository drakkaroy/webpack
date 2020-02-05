import './app.scss';
import './assets/images/handlebars-logo.png';

import './core/siteconfig';
import componentsMaping from './core/components';

const initController = (() => {

    const init = () => {

        // Object.keys(componentsMaping).forEach((item) => {
        //     console.log(componentsMaping[item]);
        // });

        const matchingComponents = document.querySelectorAll('*[data-action]');
        initComponents(matchingComponents);
    }

    const initComponents = (matchingComponents) => {
        Array.from(matchingComponents).forEach((component) => {
            
            const componentName = component.getAttribute('data-action');
            
            if(componentsMaping[componentName]){
                import(/* webpackChunkName: "[request]" */ `./components/${componentName}/${componentName}.js`)
                    .then(APP => {APP[componentName].init(component)});
            }         
            
        });
    }


    init();

})();