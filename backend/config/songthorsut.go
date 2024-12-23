package config

import (
	"fmt"

	"Songthorsut/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("songthorsut.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	if db == nil {
		panic("database not connected")
	}

	db.AutoMigrate(
		&entity.Member{},
		&entity.Products{},
		&entity.Seller{},
		&entity.Years{},
		&entity.InstituteOf{},
		&entity.Category{},
		&entity.Condition{},
		&entity.Order{},
		&entity.Products_order{},
		&entity.RoomChat{},
		&entity.Message{},
		&entity.Review{},

	)

	//Select Years
	FirstYear := entity.Years{Name: "1"}
	SecondYear := entity.Years{Name: "2"}
	ThirdYear := entity.Years{Name: "3"}
	FourthYear := entity.Years{Name: "4"}
	db.FirstOrCreate(&FirstYear, &entity.Years{Name: "1"})
	db.FirstOrCreate(&SecondYear, &entity.Years{Name: "2"})
	db.FirstOrCreate(&ThirdYear, &entity.Years{Name: "3"})
	db.FirstOrCreate(&FourthYear, &entity.Years{Name: "4"})

	//Select สำนักวิชา
	InstituteOfA := entity.InstituteOf{NameInstituteOf: "สำนักวิชาวิทยาศาสตร์"}
	InstituteOfB := entity.InstituteOf{NameInstituteOf: "สำนักวิชาเทคโนโลยีสังคม"}
	InstituteOfC := entity.InstituteOf{NameInstituteOf: "สำนักวิชาเทคโนโลยีการเกษตร"}
	InstituteOfD := entity.InstituteOf{NameInstituteOf: "สำนักวิชาวิศวกรรมศาสตร์"}
	InstituteOfE := entity.InstituteOf{NameInstituteOf: "สำนักวิชาแพทยศาสตร์"}
	InstituteOfF := entity.InstituteOf{NameInstituteOf: "สำนักวิชาพยาบาลศาสตร์"}
	InstituteOfG := entity.InstituteOf{NameInstituteOf: "สำนักวิชาทันตแพทยศาสตร์"}
	InstituteOfH := entity.InstituteOf{NameInstituteOf: "สำนักวิชาสาธารณสุขศาสตร์"}
	InstituteOfI := entity.InstituteOf{NameInstituteOf: "สำนักวิชาศาสตร์และศิลป์ดิจิทัล"}
	db.FirstOrCreate(&InstituteOfA, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาวิทยาศาสตร์"})
	db.FirstOrCreate(&InstituteOfB, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาเทคโนโลยีสังคม"})
	db.FirstOrCreate(&InstituteOfC, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาเทคโนโลยีการเกษตร"})
	db.FirstOrCreate(&InstituteOfD, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาวิศวกรรมศาสตร์"})
	db.FirstOrCreate(&InstituteOfE, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาแพทยศาสตร์"})
	db.FirstOrCreate(&InstituteOfF, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาพยาบาลศาสตร์"})
	db.FirstOrCreate(&InstituteOfG, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาทันตแพทยศาสตร์"})
	db.FirstOrCreate(&InstituteOfH, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาสาธารณสุขศาสตร์"})
	db.FirstOrCreate(&InstituteOfI, &entity.InstituteOf{NameInstituteOf: "สำนักวิชาศาสตร์และศิลป์ดิจิทัล"})

	//Select หมวดหมู่
	Category1 := entity.Category{NameCategory: "หนังสือ"}
	Category2 := entity.Category{NameCategory: "อุกปรณ์การเรียน"}
	Category3 := entity.Category{NameCategory: "รองเท้า"}
	Category4 := entity.Category{NameCategory: "อิเล็กทรอนิกส์"}
	Category5 := entity.Category{NameCategory: "เสื้อ"}
	Category6 := entity.Category{NameCategory: "กระโปรง"}
	Category7 := entity.Category{NameCategory: "กางเกง"}
	Category8 := entity.Category{NameCategory: "อื่นๆ"}

	db.FirstOrCreate(&Category1, &entity.Category{NameCategory: "หนังสือ"})
	db.FirstOrCreate(&Category2, &entity.Category{NameCategory: "อุกปรณ์การเรียน"})
	db.FirstOrCreate(&Category3, &entity.Category{NameCategory: "รองเท้า"})
	db.FirstOrCreate(&Category4, &entity.Category{NameCategory: "อิเล็กทรอนิกส์"})
	db.FirstOrCreate(&Category5, &entity.Category{NameCategory: "เสื้อ"})
	db.FirstOrCreate(&Category6, &entity.Category{NameCategory: "กระโปรง"})
	db.FirstOrCreate(&Category7, &entity.Category{NameCategory: "กางเกง"})
	db.FirstOrCreate(&Category8, &entity.Category{NameCategory: "อื่นๆ"})


	//Select สภาพสินค้า
	Condition1 := entity.Condition{NameCondition: "ใหม่"}
	Condition2 := entity.Condition{NameCondition: "มือสอง"}
	db.FirstOrCreate(&Condition1, &entity.Condition{NameCondition: "ใหม่"})
	db.FirstOrCreate(&Condition2, &entity.Condition{NameCondition: "มือสอง"})



}