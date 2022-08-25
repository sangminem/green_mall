/** 
 * @desc 테이블 정보 DDL
 * @auth hy
 * @since 2022.08.23
 * */ 

-- 상품정보 
CREATE TABLE `TBGM_PRODUCT` (
  `product_id` varchar(20) NOT NULL,
  `product_nm` varchar(40) NOT NULL,
  `product_summary` varchar(100) NOT NULL,
  `item_price` varchar(400) DEFAULT NULL,
  `category` varchar(40) NOT NULL,
  `brand_cd` varchar(20) NOT NULL,
  `brand_nm` varchar(40) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;