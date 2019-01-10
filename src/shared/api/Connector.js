function constructGetParamString(params) {
  const paramKeys = Object.keys(params);

  if (paramKeys.length === 0) {
    return '';
  }

  return `?${paramKeys.reduce((memo, key) => {
    memo.push(`${key}=${params[key]}`);

    return memo;
  }, []).join('&')}`;
}

function separateParamsOnRequestAndPath(path, params) {
  const pathParamsKeys = (path.match(/:[a-zA-Z0-9_]*/g) || []).map(param => param.slice(1));
  const separatedParams = Object.keys(params).reduce((memo, key) => {
    if (pathParamsKeys.includes(key)) {
      memo.pathParams[key] = params[key];
    } else {
      memo.requestParams[key] = params[key];
    }

    return memo;
  }, { requestParams: {}, pathParams: {} });

  return separatedParams;
} 

function parametrizePath(path, params) {
  return path.replace(/:[a-zA-Z0-9_]*/g, (match) => {
    const paramName = match.slice(1);

    if (!params[paramName]) {
      console.error(`Parameter ${match} for api path ${path} is not set`);
    }

    const paramValue = params[paramName];

    delete params[paramName];

    return paramValue;
  });
}

class Connector {
  constructor(rootUrl) {
    this.rootUrl = rootUrl;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.params = {};
  }

  setConstantParams(params) {
    this.params = params;
  }

  setHeader(name, value) {
    this.headers.append(name, value);
  }

  async sendRequest(path, params) {
    const response = await fetch(this.constructFinalPath(path, params), { 
      method: 'GET', 
      headers: this.headers, 
    });

    return this.processResponse(response, { path, params }); 
  }

  constructFinalPath(path, params) {
    const separatedParams = separateParamsOnRequestAndPath(path, { ...params, ...this.params });
    let finalPath = this.rootUrl;

    finalPath += parametrizePath(path, separatedParams.pathParams);
    finalPath += constructGetParamString(separatedParams.requestParams);

    return finalPath;
  }

  async processResponse(response) {
    const status = this.processResponseStatus(response);
    const json =  await this.responseToJson(response);

    return {
      status,
      json,
    };
  } 

  processResponseStatus(response) {
    return {
      status: response.status,
    };
  }

  async responseToJson(response) {
    return response.json();
  }
}

export default Connector;
