/**共用interface type组织文件 */

namespace API_Common {
  export enum Enum_App_Type {
    h5 = 'h5',
    ios = 'ios',
    android = 'android',
    applet = 'applet',
    wx = 'wx',
    no = 'no',
  }
  export enum Enum_Active {
    column_icon = 'column_icon',
    popular_choice = 'popular_choice',
    index_banner = 'index_banner',
  }
  export interface PageSorts {
    column: string;
    asc: boolean;
  }
  export interface ListDto<T> {
    total?: number;
    pageIndex?: number;
    pageSize?: number;
    records: T[];
  }
  export interface CommonResDto<T> {
    code?: number;
    success?: boolean;
    message?: string;
    time?: string;
    data: ListDto<T>;
  }
  export interface LabelValue {
    label: string;
    value: string | number;
  }
}

namespace API_STORE {
  export enum ONLINE {
    on, // 营业中
    stop, // 休息中
    all = null, // 全部
  }
  export enum CHANNEL {
    main = 101,
    no = '',
  }
  export enum Feature {
    wash = 1,
    beauty,
    all = null,
  }
  export interface ReqStoreListParam {
    pageIndex?: number;
    pageSorts?: API_Common.PageSorts[];
    pageSize?: number;
    cityCode?: string;
    status?: number | string;
    appId?: string;
    carType?: number | string; // 车型 1 五座小车 2 SUV/MPV null 全部
    channel?: number; // 101小象直签 102橙牛 103车点点 104省心科技 105小鲲车服
    gpsType?: number; // 百度，默认为0 不用转换 1 gps坐标， 2 搜狗， 3 高德，腾讯
    latitude?: number | string;
    longitude?: number | string;
    areaCode?: string;
    productCategoryId?: Feature; // null 全部   1 洗车  2 美容
    storeName?: string;
  }

  export interface StoreDTO {
    id?: number;
    storeNo?: string;
    thirdNo?: string;
    supplierStoreNo?: string;
    merchantId?: string;
    merchantName?: string;
    status?: number;
    contact?: string;
    mobile?: string;
    phone?: string;
    type?: number;
    province?: string;
    provinceCode?: string;
    city?: string;
    cityCode?: string;
    area?: string;
    areaCode?: string;
    address?: string;
    storeName?: string;
    storePicture?: string;
    channel?: number;
    serviceType?: number;
    supplierName?: string;
    longitude?: number;
    latitude?: number;
    openStart?: string;
    endStart?: string;
    createPerson?: string;
    createTime?: string;
    updatePerson?: string;
    updateTime?: string;
    openHoliday?: string;
    endHoliday?: string;
    holidayReason?: string;
    deletedTime?: string;
    isOnline?: number;
    distance?: number;
    categoryNameList?: string[];
    region?: string;
  }

  export interface ProductItem {
    carType?: number;
    categoryId?: number;
    channel?: number;
    childCategoryId?: number;
    cover?: string;
    createTime?: any;
    customType?: any;
    deleteTime?: any;
    deletedStatus?: any;
    description?: any;
    detailPic?: any;
    id?: number;
    linePrice?: number;
    name?: string;
    needAppointment?: any;
    oilType?: any;
    operator?: any;
    productNo?: string;
    saleNum?: any;
    salePrice?: number;
    sequence?: any;
    status?: number;
    storeNo?: string;
    supplierPrice?: number;
    templateId?: any;
    updateTime?: any;
  }
  export interface ResStoreRecord {
    cardStoreInfoVo?: StoreDTO;
    products?: ProductItem[];
  }

  export interface SiteDTO {
    provinceList: any[];
    cityList: any[];
    areasList: any[];
  }

  // 服务相关
  export interface ReqCategory {
    pageIndex?: number;
    pageSize?: number;
    appId?: string;
  }
  export interface ResCategory {
    id?: number | null;
    name?: string;
    level?: number;
    parentId?: number;
    createTime?: string;
    updateTime?: string;
    deleteTime?: string;
    operator?: string;
    deletedStatus?: number; //0正常 1删除
  }
  // 车型相关
  export interface ReqCarType {
    pageIndex?: number;
    pageSize?: number;
    appId?: string;
  }
  export interface ResCarType {
    hasSelect?: number; //	是否选中 1选中 0 否
    name?: string;
    value?: number; // 1  五座小车   2 SUV/MPV
  }
  // 车辆list
  export interface ResBindCar {
    id?: string;
    userId?: number;
    brandId?: number;
    carType?: number; // 0 未设置车型 1 五座小车 2 SUV/MPV 3 五座小车/SUV/MPV
    carNumber?: string;
    registerDate?: string;
    frameNumber?: string;
    engineNumber?: string;
    createTime?: string;
    updateTime?: string;
    deletedStatus?: number; //是否删除 1删除 0 正常
    pic?: string;
    fullName?: string;
    carId?: number;
    registrationDate?: string;
  }
  // 配置相关
  export interface ReqConfig {
    appId?: string;
    types?: string;
  }
  export interface ResConfig {
    id?: number;
    channel?: number;
    appId?: string;
    name?: string;
    enable?: number; // 是否开启 0否 1是
    entire?: number; //是否全部：0否 1是
    type?: string;
    content?: string;
    createTime?: string;
    updateTime?: string;
    deleteTime?: string;
    deletedStatus?: number; // 0正常 1删除
  }
}

namespace API_Car {
  export enum Enum_Level {
    brand = 1,
    series,
    model,
    often,
  }
  export interface ReqCarListParam {
    level: Enum_Level; //
    pageIndex?: number;
    pageSorts?: API_Common.PageSorts[];
    pageSize?: number;
    brandId?: number; // 汽车品牌id
    keyword?: string; // 搜索字符串
    seriesId?: number; // 车系id
    fullName?: string; //全称
    brandName?: string; //品牌名称
    seriesName?: string; // 车系名称
  }

  export interface ResListRecord {
    id?: number;
    brandId?: number;
    groupId?: number;
    seriesId?: number;
    fullName?: string;
    name?: string;
    brandName?: string;
    groupName?: string;
    seriesName?: string;
    state?: number;
    minprice?: number;
    maxprice?: number;
    year?: string;
    img?: string;
  }
}
export { API_STORE, API_Car, API_Common };
