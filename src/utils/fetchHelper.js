const checkStatus = function (response) {
  console.log("response: ", response);
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText))
  }
  return Promise.resolve(response)
};

const getJson = function (response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  throw new TypeError("We haven't got JSON in response!");
};

const sendMethod = function (methodType, URL, data, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION) {
  return dispatch => {
    dispatch({
      type: BEGIN_ACTION,
    });

    // Тут Ajax запрос
    fetch(URL, {
      method: methodType,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(checkStatus)
      .then(getJson)
      .then(function (json) {
        dispatch({
          type: SUCCESS_ACTION,
          payload: json,
        });
      })
      .catch(function (ex) {
        dispatch({
          type: ERROR_ACTION,
          error: true,
          payload: new Error(ex),
        });
      })
  }
};

/**
 * Функция реализует GET запрос на указанный URL
 * @param URL
 * @param BEGIN_ACTION Действие начала запроса
 * @param SUCCESS_ACTION Действие при успешном запросе
 * @param ERROR_ACTION Дейтсвие при ошибке
 * @returns {Function}
 * @constructor
 */
export function GET(URL, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION) {
  return dispatch => {
    dispatch({
      type: BEGIN_ACTION,
    });

    fetch(URL)
      .then(checkStatus)
      .then(getJson)
      .then(function (json) {
        dispatch({
          type: SUCCESS_ACTION,
          payload: json,
        })
      })
      .catch(function (ex) {
        dispatch({
          type: ERROR_ACTION,
          error: true,
          payload: new Error(ex),
        });
      })
  }
}

/**
 * Функция реализует POST запрос на указанный URL
 * @param URL
 * @param data  данные для передачи
 * @param BEGIN_ACTION Действие начала запроса
 * @param SUCCESS_ACTION Действие при успешном запросе
 * @param ERROR_ACTION Дейтсвие при ошибке
 * @returns {Function}
 * @constructor
 */
export function POST(URL, data, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION) {
  return sendMethod('POST', URL, data, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION);
}

/**
 * Функция реализует PATCH запрос на указанный URL
 * @param URL
 * @param data  данные для передачи
 * @param BEGIN_ACTION Действие начала запроса
 * @param SUCCESS_ACTION Действие при успешном запросе
 * @param ERROR_ACTION Дейтсвие при ошибке
 * @returns {Function}
 * @constructor
 */
export function PATCH(URL, data, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION) {
  return sendMethod('PATCH', URL, data, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION);
}

/**
 * Функция реализует PUT запрос на указанный URL
 * @param URL
 * @param data  данные для передачи
 * @param BEGIN_ACTION Действие начала запроса
 * @param SUCCESS_ACTION Действие при успешном запросе
 * @param ERROR_ACTION Дейтсвие при ошибке
 * @returns {Function}
 * @constructor
 */
export function PUT(URL, data, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION) {
  return sendMethod('PUT', URL, data, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION);
}

/**
 * Функция реализует DELETE запрос на указанный URL
 * @param URL
 * @param BEGIN_ACTION Действие начала запроса
 * @param SUCCESS_ACTION Действие при успешном запросе
 * @param ERROR_ACTION Дейтсвие при ошибке
 * @returns {Function}
 * @constructor
 */
export function DELETE(URL, BEGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION) {
  return dispatch => {
    dispatch({
      type: BEGIN_ACTION,
    });

    fetch(URL, {
      method: 'DELETE',
    })
      .then(checkStatus)
      .then(function () {
        dispatch({
          type: SUCCESS_ACTION
        })
      })
      .catch(function (ex) {
        dispatch({
          type: ERROR_ACTION,
          error: true,
          payload: new Error(ex),
        });
      })
  }
}



