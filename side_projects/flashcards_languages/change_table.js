
function changeTable_3(p1) {
    var arr = ``
    var arr_2 = ``
    var newTable = ``
    var textarea_ = `should be table of contents`
    if(parseInt(p1) === 1) {
      newTableArr = `红苋菜	red leafy there; three-coloured amaranth; jin choi
大白菜	see image; napa; 
芫茜	cilantro; jyun sai
豆苗	pea sprouts; dau miu
茼蒿	garland chrysantheum; tung hou
油菜	; jau choi`
    }
     if(parseInt(p1) === 2) {
      newTableArr = `元气森乳酸菌味	jyun hei (vitality), sam (forest), jyu syun kwan (lactic acid bacteria), mei (taste)
八宝粥健力宝运	baat bou zuk 
健力宝运	gin (healthy) lik (strength) bou (treasure) wan (move) 
冰红茶	bing hong chaa
康师傅绿茶	hong si fu look chaa
元气森乳茶	jyun hei sam nai chaa
老虎堂黑糖	lou fu tong haak tong (tiger dark sugar)
专壳鲜榨椰牌	zyun (speciality) hok (shell) sin (fresh) zaa (press) je (coconut) paai (board)`
    }
       if(parseInt(p1) === 3) {
      newTableArr = `水餃	shuǐ jiǎo; boiled dumplings
饅頭	mán tou; sticky buns
包子	bāo zi; steamed stuffed bun
炒麵	chǎo miàn; fried noodles
陽春麵	yáng chūn miàn; plain noodles
炒米粉	chǎo mǐ fěn; fried rice noodles
白飯	bái fàn; steamed white rice
壽司	shòu sī; sushi
素什錦	sù shí jǐn; vegetarian platter
蘿蔔糕	luóbo gāo; white radish patty
麻婆豆腐	má pó dòufu; spicy tofu
牛肉飯	niúròu fàn; beef and rice
蛋餅	dàn bǐng; egg omelet
雞腿飯	jī tuǐ fàn; chicken leg and rice
北 京烤鴨	běi jing kǎoyā; Peking duck
排骨飯	páigǔ fàn; pork chop and rice
紅燒魚	hóng shāo yú; fish cooked in soy sauce
蝦仁炒飯	xiā rén chǎo fàn; fried rice with shrimp
螃蟹	páng xiè; crab
蛋花湯	dànhuātāng; egg and vegetable soup
紫菜湯	zǐ cài tāng; seaweed soup
酸辣湯	suān là tāng; hot and sour soup`
    }
    var arrsplit = newTableArr.split('\n')
    arrsplitArray = new Array();
    for (var i = 0; i < arrsplit.length; i++) {
      arrsplitArray[i] = arrsplit[i].split("\t");
    }
    let tableRef = document.getElementById('my-table-2');
    tableRef.innerHTML = ""
    let newRow = tableRef.insertRow(-1);
    for(var i = 0; i < arrsplitArray.length; i++) {
    var tr = tableRef.insertRow()
    for(var j = 0; j < arrsplitArray[i].length; j++) {
      var td = tr.insertCell(); 
      td.appendChild(document.createTextNode(arrsplitArray[i][j]))
      td.style.border = '1px solid black';
    }
    }}

changeTable_3(1)