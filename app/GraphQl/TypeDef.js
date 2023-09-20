import { gql } from "@apollo/client";

const GET_EMP_DATA = gql`
  query userData {
    user {
      _id
      Code
      pass
      empName
      userId
      mobile1
      Secmob
      address
      email
      post
      headquarters
      panNo
      adharNo
      bankAccountNo
      ifscCode
      dob
      joiningDate
      anniversaryDate
      resignationDate
      selectedAreas
      pvrRemark
      online
      Active
      Banned
      otp
      lat
      log
    }
  }
`;
const GET_DOCTOR_DATA = gql`
  query DoctorData {
    Doctor {
      lengthData
      Doctor {
        _id
        DoctorCode
        DoctorName
        HosName
        mobile
        address
        Area
        Degree
        Speciality
        Dob
        Doa
        P1
        P2
        approved
        createdBy
        createdAt
      }
    }
  }
`;

const GET_CHEMIST_DATA = gql`
  query DoctorData {
    Chemist {
      lengthData
      Chemist {
        _id
        chemCode
        chemName
        contactPer
        mobile
        address
        Area
        DLNo
        GSTNo
        DateOfBirth
        DateOfAni
        createdBy
        createdAt
        approved
      }
    }
  }
`;
const GET_AREA_DATA = gql`
  query Query {
    Area {
      lengthData
      Area {
        AreaName
        Type
      }
    }
  }
`;
const GET_PRODUCT_DATA = gql`
  query Query {
    Product {
      lengthData
      Product {
        _id
        ProductName
        MRP
        Packing
        PTS
        PTR
        scheme {
          id
          MainPro
          FreeProduct
        }
      }
    }
  }
`;

const GET_FARE_DATA = gql`
  query Query {
    FareChart {
      lengthData
      FareChart {
        _id
        TravelMode
        OneWayKM
        HeadQuaterName
        FareName
        FarePrice
        AreaName
        Active
      }
    }
  }
`;

const GET_STOCK_DATA = gql`
  query StockiestData {
    Stockiest {
      lengthData
      Stockiest {
        _id
        Code
        contactPer
        Name
        mobile
        DLNo
        GSTNo
        DateOfBirth
        DateOfAni
        address
        Area
        Active
        createdBy
        approved
      }
    }
  }
`;

export {
  GET_STOCK_DATA,
  GET_FARE_DATA,
  GET_PRODUCT_DATA,
  GET_AREA_DATA,
  GET_CHEMIST_DATA,
  GET_DOCTOR_DATA,
  GET_EMP_DATA,
};
