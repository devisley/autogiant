Пояснения:
0) Приложение создано при помощи npx create react app (обратите внимание нужен Node >= 8.10 и npm 5.2+ and higher)

1) Структура каталогов взята по большей части из статьи https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145

2) В папке components каждому компоненту будет соответствовать своя папка (как и описано в статье), в которой размещаем его стили, его тесты, его подкомпоненты, если таковые будут - для примера см. garage.

3) в папке routes струтура каталогов соответствует навигации по страницам. В файликах index.js собираем по кирпичикам нашу страницу из компонентов, которые будем брать из components, и из видов, которые будем брать из components/layouts.

Есть одна проблемка, заключается в том, что при большой вложенности каталога в папке routes чтобы вытащить компонент из src/components придется делать вещи вроде 
import GarageContainer  from '../../../../components/garage'
Нужно решить что с этим делать. Один из вариантов - использовать файлик .env в корне приложения (https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d), но при таком варианте PHPStorm подчеркивает каталог как несуществующий, что не очень удобно.

4) Реализовал немножко функционала для гаража личного кабинета пользователя (для примера). Можно посмотреть по адресу http://localhost:3000/client/cabinet/garage.
Чтобы выводился список машин - нужно установить (если еше не установлен) и поднять json-server на 3004 порту (json-server --watch db.json --port 3004).