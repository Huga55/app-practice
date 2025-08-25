interface IUnitMapping {
  [unitKey: string]: string;
}

interface IFieldMapping {
  [unitKey: string]: string;
}

interface IDataGroup {
  fieldMapping?: IFieldMapping;
  field?: string;
  key?: string;
}

export interface IItemConfig {
  title: string;
  color?: string;
  dataGroups?: IDataGroup[];
  isSum?: boolean;
  chartType?: "bar" | "line";
}

interface IBackendData {
  [key: string]: string | number | null | undefined;
}

interface IOptions {
  getAdditionalData?: (dataItem: IBackendData) => Record<string, unknown>;
}

const defaultUnitKey = "default" as const;
const defaultUnitValue = "default" as const;

export const defaultUnitMapping = {
  [defaultUnitKey]: defaultUnitValue,
};

/**
 * Преобразуем данные для графиков
 * @param unitMapping - маппинг единиц измерения
 * @param backendData - данные с сервера
 * @param itemsConfig - конфигурация виджета (items)
 * @param options - опции
 * @returns преобразованные данные, на выходе получаем данные по каждой единице измерения (ufe, tons...), а внутри по ключу
 * из dataGroups, либо применяются дефолтные ключи, а уже по ключу находятся данные с сервера в виде массива
 */
export function transformData(
  unitMapping: IUnitMapping,
  backendData: IBackendData[],
  itemsConfig: IItemConfig[],
  options?: IOptions
): { [unitType: string]: Record<string, unknown[]> } {
  const result: { [unitType: string]: Record<string, unknown[]> } = {};

  // Инициализируем структуру результата
  Object.keys(unitMapping).forEach((unitKey) => {
    result[unitMapping[unitKey]] = {};
  });

  // Обрабатываем каждую запись из бэкенда
  backendData.forEach((dataItem) => {
    // Для каждой единицы измерения (ufe, tons...)
    Object.entries(unitMapping).forEach(([unitKey, unitType]) => {
      const unitData: Record<string, Record<string, unknown>> = {};
      const sumByKeyMap = new Map<string, number>();

      // Обрабатываем каждый элемент конфига
      itemsConfig.forEach((item) => {
        const { getAdditionalData } = options ?? {};
        const { dataGroups, isSum } = item;

        if (dataGroups) {
          dataGroups.forEach((dataGroup, index) => {
            const { fieldMapping, key = `default${index}`, field } = dataGroup;

            if (!unitData[key]) {
              unitData[key] = {};
            }

            const backendField = fieldMapping?.[unitKey] || field;

            if (!backendField || !key) {
              return;
            }

            if (dataItem[backendField] !== undefined) {
              const sum = sumByKeyMap.get(key) ?? 0;
              // eslint-disable-next-line no-constant-binary-expression
              sumByKeyMap.set(key, sum + (Number(dataItem[backendField]) ?? 0));

              unitData[key][item.title] = dataItem[backendField];
            }

            if (getAdditionalData) {
              const additionalData = getAdditionalData(dataItem);
              unitData[key] = {
                ...unitData[key],
                ...additionalData,
              };
            }
          });
        }

        // высчитываем сумму по всем полям
        if (isSum) {
          Array.from(sumByKeyMap.keys()).forEach((key) => {
            const sum = sumByKeyMap.get(key);
            unitData[key][item.title] = sum ?? 0;
          });
        }
      });

      Object.keys(unitData).forEach((key) => {
        if (!result[unitType][key]) {
          result[unitType][key] = [];
        }
        result[unitType][key].push(unitData[key]);
      });
    });
  });

  return result;
}
