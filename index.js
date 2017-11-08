const renderToElement = (element, dist) => {

};
const initialTodoList =  [
    {name: "erfrewrf", deadline: "2017-11-08", done: false},
    {name: "erfrewrf", deadline: "2017-11-08", done: false},
    {name: "33333333333333", deadline: "2017-11-02",  done: false},
    {name: "hgdx", deadline: "2017-11-07", done: false},];


/*
interface todoListItem {
        name: string,
        deadline: string/date,
        done: bool,
        domEl: ?DOMElement,
}*/

(function getToDoList() {
    window.lastId = 0;

    const getMonday = (date) => {
        const day =  date.getDay() || 7;
        return day !== 1
            ? new Date((new Date(date)).setHours(-24 * (day - 1)))
            : new Date(date);
    };

    const getSunday = (date) => {
        const day = date.getDay() || 1;
        return day !== 7
            ? new Date((new Date(date)).setHours(24 * (7 - day)))
            : new Date(date);
    };

    const getFirstDayOfMonth = (date) => {
        const y = date.getFullYear();
        const m = date.getMonth();
        return new Date(y, m, 1);
    };

    const getLastDayOfMonth = (date) => {
        const y = date.getFullYear();
        const m = date.getMonth();
        return new Date(y, m + 1, 0);
    };

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
       /* initialTodoList.map((it) => ({
            ...it,
            domEl: makeTodoItemt(it),
        }));
    const res = document.createDocumentFragment();
    todoList.forEach(el => res.appendChild(el.domEl));
    tasksList.appendChild(res); */

    // ********************* filters ***********************

    const dayFilter = (filter, todoList, DOMElement) => () => {
        filter(todoList, DOMElement);
    };
    filterDay.addEventListener('click', dayFilter(boundaryFilter, todoList, filterDay));

    const weekFilter = (filter, todoList, DOMElement, getMonday, getSunday) => {
        return function(e) {
            const now = new Date();
            filter(todoList, DOMElement, getMonday(now), getSunday(now));
        };
    };
    filterWeek.addEventListener('click', weekFilter(boundaryFilter, todoList, filterWeek, getMonday, getSunday));

    const monthFilter = (filter, todoList, DOMElement, getFirstDayOfMonth, getLastDayOfMonth) => {
        return function(e) {
            const now = new Date();
            filter(todoList, DOMElement, getFirstDayOfMonth(now), getLastDayOfMonth(now));
        };
    };
    filterMonth.addEventListener('click', monthFilter(boundaryFilter, todoList, filterMonth, getFirstDayOfMonth, getLastDayOfMonth));

    function boundaryFilter(todoList, DOMElement, _start = new Date(), _end = new Date()) {
        const start = new Date(_start);
        start.setHours(0,0,0,0);
        const end = new Date(_end);
        end.setHours(23,59,59,59);

        if (todoList.length !== 0) {
            let result = DOMElement.classList.toggle('filters--active');
            if (result) {
                for (let i = 0; i < todoList.length; i++) {
                    const deadline = new Date(todoList[i].deadline);
                    if (start > deadline || end < deadline) {
                        console.log(todoList[i]);
                        tasksList.removeChild(todoList[i].domEl);
                    }
                }
            } else {
                for (let i = 0; i < todoList.length; i++) {
                    tasksList.appendChild(todoList[i].domEl);
                }
            }
        }
    }

    /*makeTodoItem({
        name: '',
        done: '',
        dedline: '',
    });*/

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (formInput.value.length !== 0 && dataPicker.value.length !== 0) {
            let id = getId();
            let fragmentListOfTasks = document.createDocumentFragment();

            let taskItem = makeElement('li', {
                class: 'tasks-list__item',
            });

            let taskCheckbox = makeElement('input', {
                class: 'tasks-list__item__checkbox',
                type: 'checkbox',
                hidden: 'true',
                id: 'checkbox' + id,
            });

            let taskName = makeElement('label', {
                class: 'tasks-list__item__name',
                for: 'checkbox' + id,
            }, formInput.value);

            let taskDeadline = makeElement('span', {
                class: 'tasks-list__item__deadline',
            }, dataPicker.value);

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

            const todoItem = {
                name: formInput.value,
                deadline: dataPicker.value,
                domEl: taskItem,
                done: false,
            };

            todoList.push(todoItem);

            // formInput.value = '';
        }
    });

    let getId = function () {
        return ++window.lastId;
    }
})();