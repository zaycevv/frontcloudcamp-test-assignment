# Тестовое задание для поступления в FrontCloudCamp

Попробовать тут: https://frontcloudcamp-test-assignment.vercel.app/

404 Page 🤫🤫🤫

Результаты выполнения тестового задания следует код опубликовать на GitHub и захостить на любой открытой платформе (например, Github Pages) и отправить на почту frontcloudcamp@cloud.ru.

Технические требования:
Для разработки приложения использовать [макет](https://www.figma.com/file/rzIp6awR6dGFVrcxcCEwzD/Untitled?type=design&node-id=0-1&t=90NCIZwzg7SIsdMb-0)

В рамках дизайна формы реализовано 3 отдельных таба(шага) формы, которые можно переключать между собой. При переходе от таба к табу (в том числе возвращаясь на предыдущий) информация должна сохранятся.

На первом экране необходимо добавить информацию о себе и по нажатию на кнопку будет происходить переход на форму. При переходе должен меняться роут.

На каждом этапе формы нужно валидировать значения конкретного шага

После отправки формы показывать модальное окно с success или error. Модалку нужно будет разработать самому, не используя сторонние библиотеки или ui-компоненты.

Для отправки формы использовать api https://api.sbercloud.ru/content/v1/bootcamp/frontend

Адаптивная версия обязательна, способ реализации по твоему выбору

Валидация и описание полей:
- nickname - строковое значение, максимальная длина 30 символов, могут быть просто буквы и цифры (спец символы запрещены)
- name - строковое значение, максимальная длина 50 символов, только буквы
- sername - строковое значение, максимальная длина 50 символов, только буквы
- phone - строковое значение, форма записи +7 (900) 000-00-00 - реализовать маску ввода, +7, (), -, уже подставленные символы, валидация - цифры
- email - строковое значение, валидация на email стандартная @ и .домен
- sex - enum 'man' | 'woman' реализовать как select
- advantages - массив строк, основной критерий - массив строк. По нажатию на “Плюс” должно добавляться новое поле и так же валидироваться.
- radio - number блок, в дизайне должна быть группа элементов RadioGroup
- checkbox - массив number, в дизайне должна быть группа элементов CheckboxGroup
- about - textarea блок максимальная длина 200 символов, в правом нижнем углу добавить счётчик символов без пробелов

## ⚙️ Стек:

- React
- Typescript
- Redux-Toolkit
- Vite, Eslint
- SCSS
- Yup
- Axios
- React-router-dom
- React-hook-form
- React-input-mask

## Установка

1. Склонируйте репозиторий `git clone https://github.com/zaycevv/frontcloudcamp-test-assignment`
2. Перейдите в директорию проекта `cd frontcloudcamp-test-assignment`
3. Установите зависимости `pnpm install`
4. Запустите локальную версию `pnpn run dev`

## Скриншоты
![Main](https://github.com/zaycevv/frontcloudcamp-test-assignment/assets/127613678/dc2edb4c-2f55-4354-9bd9-7a812d3dbc33)
![Step1](https://github.com/zaycevv/frontcloudcamp-test-assignment/assets/127613678/49a13f88-a753-4e3e-a5ac-7a80c10a3ae5)
![Step2](https://github.com/zaycevv/frontcloudcamp-test-assignment/assets/127613678/95dfa99a-3921-43f8-8588-bbcc17d5b308)
![Step3](https://github.com/zaycevv/frontcloudcamp-test-assignment/assets/127613678/4a29b433-d59e-4ebd-83f7-07bff43423b9)
![Success](https://github.com/zaycevv/frontcloudcamp-test-assignment/assets/127613678/9941f8d2-3f98-4721-bca0-daac47cc8da6)






