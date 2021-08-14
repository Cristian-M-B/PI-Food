// import React from 'react';
// import { render } from '@testing-library/react';
// import { configure, shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-17';
// import Form, { validateInputs } from './Form.js';

// configure({adapter: new Adapter()});

// describe('<Form /> Mounted', () => {
//     let wrapper;
//     beforeEach(() => {
//         wrapper = mount(<Form />);
//     });
//     it('El form debe tener un label que diga: "Name"', () => {
//         const { container } = render(<Form />)
//         const element = container.querySelectorAll('label')[0]
//         expect(element.innerHTML).toBe('Name:');
//     });

//     it('El form debe tener un label que diga: "Score"', () => {
//         const { container } = render(<Form />)
//         const element = container.querySelectorAll('label')[1]
//         expect(element.innerHTML).toBe('Score');
//     });

//     it('El form debe tener un input con name "name" y type "text"', () => {
//         const { container } = render(<Form />)
//         const element = container.querySelectorAll('input')[0]
//         expect(element.type).toBe('text');
//         expect(element.name).toBe('name');
//     });

//     it('El form debe tener un input con name "score" y type "text"', () => {
//         const { container } = render(<Form />)
//         const element = container.querySelectorAll('input')[1]
//         expect(element.type).toBe('text');
//         expect(element.name).toBe('score');
//     });

//     it('El input de name tiene que tener la clase errors si tiene un error', () => {
//         wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'My n@me' } });
//         const ele = wrapper.find('input[name="name"]');
//         expect(ele.hasClass('errors')).toBeTruthy();
//     });
//     it('El input de name NO tiene que tener la clase errors si tiene un nombre correcto', () => {
//         wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'My name' } });
//         const ele = wrapper.find('input[name="name"]');
//         expect(ele.hasClass('errors')).toBeFalsy();
//     });
//     it('El input de score tiene que tener la clase errors si tiene un error', () => {
//         wrapper.find('input[name="score"]').simulate('change', { target: { name: 'score', value: '150' } });
//         const ele = wrapper.find('input[name="score"]');
//         expect(ele.hasClass('errors')).toBeTruthy();
//     });
//     it('El input de score NO tiene que tener la clase errors si tiene un score correcto', () => {
//         wrapper.find('input[name="score"]').simulate('change', { target: { name: 'score', value: '75' } });
//         const ele = wrapper.find('input[name="score"]');
//         expect(ele.hasClass('errors')).toBeFalsy();
//     });
// });

// import React from 'react';
// import { configure, shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// // import { addTodo } from '../../actions';
// import configureStore from "redux-mock-store";
// // import AddTodoDefault, { AddTodo } from './AddTodo.js';
// import Form from './Form.js';

// configure({ adapter: new Adapter() });

// describe('<Form />', () => {

//     describe('Estructura', () => {
//         let wrapper;
//         beforeEach(() => {
//             wrapper = shallow(<Form />);
//         })
//         it('Renderiza un <form>', () => {
//             expect(wrapper.find('form')).toHaveLength(1)
//         })

//         it('Renderiza un label con el texto igual a "Name"', () => {
//             // El orden en el que se encuentran los Labels es importante.
//             expect(wrapper.find('label').at(0).text()).toEqual('Name');
//         })

//         it('Renderiza un input con la propiedad "name" igual a "name"', () => {
//             expect(wrapper.find('input[name="name"]')).toHaveLength(1);
//         })

//         it('Renderiza un label con el texto igual a "Score"', () => {
//             // El orden en el que se encuentran los Labels es importante.
//             expect(wrapper.find('label').at(1).text()).toEqual('Score');
//         })

//         it('Renderiza una input con la propiedad "name" igual a "score"', () => {
//             expect(wrapper.find('input[name="score"]')).toHaveLength(1);
//         })

        // it('Renderiza un label con el texto igual a "Place"', () => {
        //     // El orden en el que se encuentran los Labels es importante.
        //     expect(wrapper.find('label').at(2).text()).toEqual('Place');
        // })

        // it('Renderiza un input con la propiedad "name" igual a "place"', () => {
        //     expect(wrapper.find('input[name="place"]')).toHaveLength(1);
        // })

        // it('Renderiza un label con el texto igual a "Date"', () => {
        //     // El orden en el que se encuentran los Labels es importante.
        //     expect(wrapper.find('label').at(3).text()).toEqual('Date');
        // })

        // it('Renderiza un input con la propiedad "name" igual a "date"', () => {
        //     expect(wrapper.find('input[name="date"]')).toHaveLength(1);
        // })

        // it('Renderiza un boton con el "type" "submit"', () => {
        //     expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
        // })
//     })
// })