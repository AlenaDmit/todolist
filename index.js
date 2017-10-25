const renderToElement = (element, dist) => {

};

(function getToDoList() {
    const makeElement = (type='div', attributes={}, content='', filter='') => {
        let element = document.createElement(type);
        element.innerHTML = content;
            for (key in attributes) {
                element.setAttribute(key, attributes[key])
            }
        return element;
    };

    let fragment = document.createDocumentFragment();

    let container = makeElement('div', {
        class: 'container',
    });

    let nameOfForm = makeElement('div', {
        class: 'form-name',
    }, 'TODO LIST');

    let form = makeElement('form', {
        class: "form",
        action: '#',
    });

    let formInput = makeElement('input', {
        type: 'text',
        class: 'form__input',
        required: true,
        placeholder: "Введите название...",
    });

    let btnAdd = makeElement('button', {
        class: 'form__link-btn',
        type: 'submit',
    });

    let imgAdd = makeElement('img', {
        class: 'form__link-btn__img-btn-add',
        src: 'icons/add-black.svg',
    });

    let dataPicker = makeElement('input', {
        class: 'form__date',
        type: 'date',
        required: true,
    });

    let filters = makeElement('ul', {
        class: 'filters',
    });

    let filtersText = makeElement('li', {
        class: 'filters__text',
    }, 'Фильтр:');

    let filterDay = makeElement('li', {
        class: 'filters__day',
    }, 'день');

    let filterWeek = makeElement('li', {
        class: 'filters__week',
    }, 'неделя');

    let filterMonth = makeElement('li', {
        class: 'filters__month',
    }, 'месяц');

    let tasksList = makeElement('ul', {
        class: 'tasks-list',
    });

    dataPicker.onchange = function () {
        if (dataPicker.value !== '') {
            dataPicker.classList.add('form__data--choosed');
        } else {
            dataPicker.classList.remove('form__data--choosed');
        }
    };

    form.appendChild(formInput);
    form.appendChild(dataPicker);
    btnAdd.appendChild(imgAdd);
    form.appendChild(btnAdd);
    filters.appendChild(filtersText);
    filters.appendChild(filterDay);
    filters.appendChild(filterWeek);
    filters.appendChild(filterMonth);
    container.appendChild(nameOfForm);
    container.appendChild(form);
    container.appendChild(filters);
    container.appendChild(tasksList);
    fragment.appendChild(container);
    document.body.appendChild(fragment);

    imgAdd.onmouseover = function () {
        imgAdd.setAttribute('src','icons/add-green.svg');
    };

    imgAdd.onmouseout = function () {
        imgAdd.setAttribute('src', 'icons/add-black.svg');
    };

    let todoList = [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (formInput.value.length !== 0 && dataPicker.value.length !== 0) {
            const todoItem = {
                name: formInput.value,
                deadline: dataPicker.value,
                done: false,
            };

            todoList.push(todoItem);

            let fragmentListOfTasks = document.createDocumentFragment();

            let taskItem = makeElement('li', {
                class: 'tasks-list__item',
            });

            let taskCheckbox = makeElement('input', {
                class: 'tasks-list__item__checkbox',
                type: 'checkbox',
                hidden: 'true',
                id: 'checkbox',
            });

            let taskName = makeElement('label', {
                class: 'tasks-list__item__name',
                for: 'checkbox',
            }, todoItem.name);

            let taskDeadline = makeElement('span', {
                class: 'tasks-list__item__deadline',
            }, todoItem.deadline);

            let btnDeleteTask = makeElement('a', {
                class: 'tasks-list__item__link-btn',
            });

            let imgDeleteTask = makeElement('img', {
                src: 'icons/delete-black.svg',
                class: 'tasks-list__item__link-btn__img-btn-delete',
            });

            taskItem.appendChild(taskCheckbox);
            taskItem.appendChild(taskName);
            taskItem.appendChild(taskDeadline);
            btnDeleteTask.appendChild(imgDeleteTask);
            taskItem.appendChild(btnDeleteTask);
            fragmentListOfTasks.appendChild(taskItem);
            tasksList.appendChild(fragmentListOfTasks);

            imgDeleteTask.onmouseover = function(e) {
                e.stopPropagation();
                imgDeleteTask.setAttribute('src', 'icons/delete-red.svg');
            };

            imgDeleteTask.onmouseout = function(e) {
                e.stopPropagation();
                imgDeleteTask.setAttribute('src', 'icons/delete-black.svg');
            };

            imgDeleteTask.addEventListener('click', function (e) {
                e.stopPropagation();
                let target = e.target.parentNode.parentNode;
                tasksList.removeChild(target);
            });

            formInput.value = '';
            dataPicker.value = '';

            // filterDay.addEventListener('click', function (e) {
            //     for (let i = 0; i < valueOfData.length; i++) {
            //         console.log(typeof valueOfData[i]);
            //     }
            // })
        }

    })
})();