import sgcuLOGO from '$lib/assets/images/sgcu.png';
import smoLOGO from '$lib/assets/images/smo.png';
import sapaLOGO from '$lib/assets/images/sapanisit.png';
import testImg1 from '$lib/assets/images/picslide1.jpg';
import testImg2 from '$lib/assets/images/picslide2.jpg';

const tempText =
	'Seventeen เป็นวงบอยกรุ๊ปจากค่าย Pledis Entertainment เดบิวต์เมื่อวันที่ 26 พฤษภาคม 2015 ประกอบด้วยสมาชิก 13 คน แบ่งออกเป็น 3 กลุ่มย่อย (Unit) ได้แก่ กลุ่มฮิปฮอป (Hip Hop Unit) กลุ่มเสียงร้อง (Vocal Unit) และกลุ่มการแสดง (Performance Unit) สาเหตุที่ตั้งชื่อวงว่า Seventeen ทั้ง ๆ ที่มีสมาชิกแค่ 13 คน ก็เพราะชื่อวงนี้มีคอนเซ็ปต์มาจากการรวมตัวของสมาชิก ทั้ง 13 คน กลุมย่อย 3 กลุ่ม จนกลายเป็น 1 ทีม คือ 17 หรือ Seventeen นั่นเอง';

const orgDatas = [
	{
		src: smoLOGO,
		alt: 'SMO Logo',
		title: 'สโมสรนิสิตจุฬาลงกรณ์มหาวิทยาลัย',
		desc: tempText,
		buttonText: 'รู้จักสโมสรนิสิตฯ',
		buttonColor : 'bg-sucu-pink-05',
		subPath: 'smo',
		shortName : 'สโมสรนิสิตจุฬาฯ',
		whatIs: tempText,
		duty: tempText,
		images : [testImg1, testImg2]
	},
	{
		src: sgcuLOGO,
		alt: 'SGCU Logo',
		title: 'องค์การบริหารสโมสรนิสิต จุฬาลงกรณ์มหาวิทยาลัย (อบจ.)',
		desc: tempText,
		buttonText: 'รู้จัก อบจ.',
		buttonColor : 'bg-sucu-pink-03',
		subPath: 'sgcu',
		shortName : 'อบจ.',
		whatIs: tempText,
		duty: tempText,
		images : [testImg1, testImg2, testImg1, testImg2, testImg1, testImg2]
	},
	{
		src: sapaLOGO,
		alt: 'Sapanisit Logo',
		title: 'สภานิสิตจุฬาลงกรณ์มหาวิทยาลัย',
		desc: tempText,
		buttonText: 'รู้จักสภานิสตฯ',
		buttonColor : 'bg-sucu-pink-02',
		subPath: 'sapa',
		shortName : 'สภานิสิต',
		whatIs: tempText,
		duty: tempText
	}
];

export default orgDatas;
