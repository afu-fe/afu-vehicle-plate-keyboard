/* eslint-disable no-prototype-builtins */
// export const firstScreen = [
//   ['京','津','渝', '沪','冀', '晋','辽','吉','黑'],
//   ['苏','浙','皖', '闽','赣', '鲁','豫','鄂','湘'],
//   ['粤','琼','川', '贵','云', '陕','甘','青','蒙',],
//   ['桂','宁','新', '藏','使'],
// ];
/**
  新能源车牌号规则：
  https://zh.wikipedia.org/wiki/中华人民共和国民用机动车号牌#新能源汽车号牌
 */
export const provinceSelect = [
  ['京', '津', '渝', '沪', '冀', '晋', '辽', '吉'],
  ['浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘'],
  ['川', '贵', '云', '陕', '甘', '青', '蒙', '桂'],
  [ '黑', '苏', '藏', '粤', '琼', '宁', '新',''],
];
export const numberSelect = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['使', '0'],
];
export const numberAbcSelect = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L','Z',],
  [ 'X', 'C', 'V', 'B', 'N', 'M'],
];
export const secondScreenStatus = {
  DisableAll: 'DisableAll',
  AllowAll: 'AllowAll',
  AlphabetOnly:  "AlphabetOnly",
  NumberOnly: 'NumberOnly',
  NoNumberOnly: 'NoNumberOnly',
  AllowSpecialCharaters: 'AllowSpecialCharaters'
}
export const AllowAll = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const AllowSpecialCharaters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const AllNumber = '0123456789';
// 新能源标识
export const newEnergyLetter = 'ABCDEFGHJK';
// 新能源汽车第8位
export const smallVehicleNewEnergy = '0123456789';
export type RulesType = {
  [key: string]: { rule: string };
};
export type ObjType = {
  [key: string]: any[]; // 或者具体的数组类型，根据你的需要
};

// 各地车辆号牌机关代号
export const rules: RulesType = {
  京: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  津: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  冀: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  晋: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  蒙: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  辽: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  吉: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  黑: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  沪: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  苏: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  浙: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  皖: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  闽: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  赣: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  鲁: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  豫: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  鄂: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  湘: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  粤: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  桂: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  琼: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  渝: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  川: {
    rule: 'AGBCDEFHJKLMOQRSTUVWXYZ',
  },
  贵: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  云: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  藏: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  陕: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  甘: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  青: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  宁: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  新: {
    rule: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  使: {
    rule: AllNumber,
  },
};

export const getRuleConfig = (key: string) => {
  if (key === '使') {
    return [
      [rules[key]?.rule, AllNumber, AllNumber, AllNumber, AllNumber, AllNumber],
    ];
  } else {
    return [
      [
        rules[key]?.rule,
        AllowAll,
        AllowAll,
        AllowAll,
        AllowAll,
        AllowAll,
        AllowAll
      ]
    ];
  }
};
// 合并配置项目
export const mergeLicensePlateRules = (obj1: ObjType, obj2: ObjType) => {
  const mergedObj: ObjType = { ...obj1 };
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (mergedObj.hasOwnProperty(key)) {
        // 去重
        const mergedValue = mergedObj[key];
        const value = obj2[key];
        value.forEach((item) => {
          if (!mergedValue.includes(item)) {
            mergedValue.push(item);
          }
        });
        mergedObj[key] = mergedValue;
      } else {
        // 新增
        mergedObj[key] = obj2[key];
      }
    }
  }

  return mergedObj;
};

export const localConfig = (config: ObjType) => {
  const obj: ObjType = {};
  Object.keys(rules)?.forEach((item) => {
    obj[item] = getRuleConfig(item);
  });
  // console.log('===', obj);
  console.log('===', mergeLicensePlateRules(obj, config));
  return mergeLicensePlateRules(obj, config);
};
