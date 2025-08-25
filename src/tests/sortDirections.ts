interface IDirectionRoute {
  from: string;
  to: string;
}

export const sortDirections = (routes: IDirectionRoute[]) => {
  let currentKey = "";
  const routesMap = new Map<string, string>();
  const correctArr: IDirectionRoute[] = [];

  routes.forEach(({ from, to }) => {
    routesMap.set(from, to);
  });

  const valuesSet = new Set(routesMap.values());

  Array.from(routesMap.keys()).some((key) => {
    if (!valuesSet.has(key)) {
      currentKey = key;
      return true;
    }

    return false;
  });

  while (true) {
    const currentValue = routesMap.get(currentKey);

    if (!currentValue) {
      return correctArr;
    }

    correctArr.push({
      from: currentKey,
      to: currentValue,
    });

    currentKey = currentValue;
  }
};
