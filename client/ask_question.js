Router.route('/new_question', {
    template: 'questionForm',
});

if (Meteor.isClient) {
    Template.questionForm.events({
        'submit .ask_question': function(event){
            event.preventDefault();

            var question_doc = {
                user: Meteor.userId(),
                lang_from: event.target.lang_from.value,
                lang_to: event.target.lang_to.value,
                title: event.target.title.value,
                timestamp: new Date(),
                type: "text", // default
                data: event.target.text.value,
                username: Meteor.user().username,
            };

            var photo = Session.get("photo");
            if (photo) {
                // Prepare document for photo type
                question_doc.type = "photo";
                delete question_doc["data"];
            }

            Questions.insert(question_doc, function (err, question_id) {
                if (err) {
                    // TODO: error handling
                    console.log("error in questions insert:", err);
                }
                else if (photo) {
                    // Upload photo to MongoDB GridFS in background
                    Meteor.call("uploadQuestionPhoto", question_id, photo, function (err, response) {
                        console.log(err);
                        console.log(response);
                        if (err) {
                            // TODO: error handling
                            console.log("got error from imageToMongo:", err, response);
                        }
                    });
                    Session.set("photo", undefined);
                } else {
                    Router.go('/ask');
                }
            });

            // TODO: loop...
            event.target.lang_from.value = "";
            event.target.lang_to.value = "";
            event.target.title.value = "";
            event.target.text.value = "";

        },
        'click .go-to-record': function(event) {
            event.preventDefault();
            Router.go('/record');
        },
    });

     Template.questionForm.events({
        // take a pic
        "click .takePhoto": function(event, template) {
            var cameraOptions = {
                width: 800,
                height: 600
            };
            MeteorCamera.getPicture(cameraOptions, function (error, data) {
               if (!error) {
                   template.$('.photo').attr('src', data);
                   Session.set("photo", data);
               }
            });
            event.preventDefault();
            Router.go('/ask');
        }
      });

      Template.questionForm.helpers({
        //return some language into the template which will be displayed using {{spacebars}}
        language: function () {
          return [
    //Languages - iso639.txt
    'Afar',
    'Abkhazian',
    'Avestan',
    'Afrikaans',
    'Akan',
    'Amharic',
    'Aragonese',
    'Arabic',
    'Assamese',
    'Avaric',
    'Aymara',
    'Azerbaijani',
    'Bashkir',
    'Belarusian',
    'Bulgarian',
    'Bihari',
    'Bislama',
    'Bambara',
    'Bengali',
    'Tibetan',
    'Breton',
    'Bosnian',
    'Catalan',
    'Chechen ',
    'Chamorro',
    'Corsican',
    'Cree',
    'Czech',
    'Church Slavic',
    'Chuvash',
    'Welsh',
    'Danish ',
    'German',
    'Divehi',
    'Dzongkha',
    'Ewe',
    'Greek',
    'English',
    'Esperanto',
    'Spanish',
    'Estonian',
    'Basque',
    'Persian',
    'Fulah',
    'Finnish',
    'Fijian',
    'Faroese',
    'French',
    'Western Frisian',
    'Irish',
    'Gaelic',
    'Galician',
    'Guarani',
    'Gujarati',
    'Manx',
    'Hausa',
    'Hebrew',
    'Hindi ',
    'Hiri Motu',
    'Croatian',
    'Haitian',
    'Hungarian',
    'Armenian',
    'Herero',
    'Indonesian',
    'Interlingue',
    'Igbo',
    'Sichuan Yi',
    'Inupiaq',
    'Ido',
    'Icelandic',
    'Italian',
    'Inuktitut',
    'Japanese',
    'Javanese',
    'Georgian',
    'Kongo',
    'Kikuyu',
    'Kuanyama',
    'Kazakh',
    'Kalaallisut',
    'Khmer',
    'Kannada',
    'Korean',
    'Kanuri',
    'Kashmiri',
    'Kurdish',
    'Komi',
    'Cornish',
    'Kirghiz',
    'Latin',
    'Luxembourgish',
    'Ganda',
    'Limburgan',
    'Lingala',
    'Lao',
    'Lithuanian',
    'Luba-Katanga',
    'Latvian',
    'Malagasy',
    'Marshallese',
    'Maori',
    'Macedonian',
    'Malayalam',
    'Mongolian',
    'Moldavian',
    'Marathi',
    'Malay',
    'Maltese',
    'Burmese',
    'Nauru',
    'Norwegian',
    'Nepali',
    'Ndonga',
    'Dutch; Flemish',
    'Norwegian',
    'Navajo; Navaho',
    'Occitan',
    'Ojibwa',
    'Oromo',
    'Oriya',
    'Ossetian; Ossetic',
    'Panjabi; Punjabi',
    'Pali',
    'Polish ',
    'Pushto',
    'Portuguese ',
    'Quechua',
    'Raeto-Romance',
    'Rundi',
    'Romanian',
    'Russian',
    'Kinyarwanda',
    'Sanskrit',
    'Sardinian',
    'Sindhi',
    'Northern Sami',
    'Sango',
    'Sinhala; Sinhalese',
    'Slovak',
    'Slovenian',
    'Samoan ',
    'Shona',
    'Somali',
    'Albanian',
    'Serbian',
    'Swati',
    'Sotho, Southern ',
    'Sundanese ',
    'Swedish',
    'Swahili',
    'Tamil',
    'Telugu',
    'Tajik',
    'Thai',
    'Tigrinya',
    'Turkmen',
    'Tagalog',
    'Tswana',
    'Tonga ',
    'Turkish',
    'Tsonga',
    'Tatar ',
    'Twi',
    'Tahitian',
    'Uighur; Uyghur',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Venda ',
    'Vietnamese',
    'Volapk',
    'Walloon',
    'Wolof',
    'Xhosa',
    'Yiddish',
    'Yoruba',
    'Zhuang; Chuang',
    'Chinese',
    'Zulu',
    'Marwari',
    'Erzya',
    'Nahuatl',
    'Neapolitan',
    'Newari',
    'Nias',
    'Niuean',
    'Nogai',
    'Norse, Old',
    'Nubian languages',
    'Nyamwezi',
    'Nyankole',
    'Nyoro',
    'Nzima',
    'Osage',
    'Turkish',
    'Otomian languages',
    'Papuan (Other)',
    'Pangasinan',
    'Pahlavi',
    'Pampanga',
    'Papiamento',
    'Palauan',
    'Persian',
    'Philippine (Other)',
    'Phoenician',
    'Pohnpeian',
    'Prakrit languages',
    'Rajasthani',
    'Rapanui ',
    'Rarotongan',
    'Romance (Other)',
    'Romany',
    'Sandawe',
    'Yakut',
    'Salishan languages ',
    'Samaritan Aramaic',
    'Sasak',
    'Santali',
    'Sicilian',
    'Scots',
    'Selkup',
    'Sign Languages',
    'Shan ',
    'Sidamo',
    'Siouan languages ',
    'Lule Sami',
    'Inari Sami',
    'Skolt Sami',
    'Soninke ',
    'Sogdian',
    'Songhai',
    'Serer',
    'Sukuma',
    'Susu',
    'Sumerian',
    'Syriac',
    'Tai (Other)',
    'Timne',
    'Tereno',
    'Tetum',
    'Tigre',
    'Tiv',
    'Tokelau',
    'Tlingit',
    'Tamashek',
    'Tonga (Nyasa) ',
    'Tok Pisin',
    'Tsimshian',
    'Tumbuka',
    'Tupi languages',
    'Altaic (Other)',
    'Tuvalu',
    'Tuvinian',
    'Udmurt',
    'Ugaritic',
    'Umbundu',
    'Undetermined ',
    'Vai',
    'Votic',
    'Wakashan',
    'Walamo',
    'Waray',
    'Washo',
    'Kalmyk',
    'Yao',
    'Yapese',
    'Yupik',
    'Zapotec',
    'Zenaga',
    'Zande',
    'Zuni',
    'Achinese',
    'Acoli',
    'Adangme',
    'Adyghe; Adygei',
    'Afrihili',
    'Ainu',
    'Akkadian',
    'Aleut',
    'Algonquian',
    'Southern Altai',
    'English',
    'Angika',
    'Apache languages',
    'Aramaic',
    'Araucanian',
    'Arapaho',
    'Artificial (Other)',
    'Arawak',
    'Asturian; Bable',
    'Athapascan',
    'Australian',
    'Awadhi',
    'Banda',
    'Bamileke',
    'Baluchi',
    'Balinese',
    'Basa',
    'Baltic ',
    'Beja',
    'Bemba',
    'Berber ',
    'Bhojpuri',
    'Bikol',
    'Bini',
    'Siksika',
    'Bantu ',
    'Braj',
    'Batak (Indonesia)',
    'Buriat',
    'Buginese',
    'Blin; Bilin',
    'Caddo',
    'Central American Indian ',
    'Carib',
    'Caucasian ',
    'Cebuano',
    'Celtic (Other)',
    'Chibcha ',
    'Chagatai',
    'Chuukese',
    'Mari',
    'Chinook jargon',
    'Choctaw',
    'Chipewyan',
    'Cherokee',
    'Cheyenne',
    'Chamic',
    'Coptic',
    'Kashubian',
    'Cushitic (Other)',
    'Dakota',
    'Dargwa',
    'Dayak',
    'Delaware',
    'Slave (Athapascan)',
    'Dogrib',
    'Dinka',
    'Dogri',
    'Dravidian (Other)',
    'Lower Sorbian',
    'Duala',
    'Dyula',
    'Efik',
    'Egyptian',
    'Ekajuk',
    'Elamite',
    'English',
    'Ewondo',
    'Fang',
    'Fanti',
    'Filipino; Pilipino',
    'Finno-Ugrian',
    'Fon',
    'French, Middle',
    'French, Old',
    'Northern Frisian',
    'Eastern Frisian',
    'Friulian',
    'Ga',
    'Gayo',
    'Gbaya',
    'Germanic',
    'Geez',
    'Gilbertese',
    'German, Middle High',
    'German, Old High',
    'Gondi',
    'Gorontalo',
    'Gothic',
    'Grebo',
    'Greek, Ancient',
    'Alemanic; Swiss German',
    'Gwichin',
    'Haida',
    'Hawaiian',
    'Hiligaynon',
    'Himachali',
    'Hittite',
    'Hmong',
    'Upper Sorbian',
    'Hupa',
    'Iban',
    'Ijo',
    'Iloko',
    'Indic (Other)',
    'Indo-European (Other)',
    'Ingush',
    'Iranian (Other)',
    'Iroquoian',
    'Lojban',
    'Judeo-Persian',
    'Judeo-Arabic',
    'Kara-Kalpak',
    'Kabyle',
    'Kachin',
    'Kamba',
    'Karen',
    'Kawi',
    'Kabardian',
    'Khasi',
    'Khoisan (Other)',
    'Khotanese',
    'Kimbundu',
    'Konkani',
    'Kosraean',
    'Kpelle',
    'Karachay-Balkar',
    'Karelian',
    'Kru',
    'Kurukh',
    'Kumyk',
    'Kutenai',
    'Ladino',
    'Lahnda',
    'Lamba',
    'Lezghian',
    'Mongo',
    'Lozi',
    'Luba-Lulua',
    'Luiseno',
    'Lunda',
    'Luo',
    'lushai',
    'Madurese',
    'Magahi',
    'Maithili',
    'Makasar',
    'Mandingo',
    'Austronesian (Other)',
    'Masai',
    'Moksha',
    'Mandar',
    'Mende',
    'Irish',
    'Mi kmaq; Micmac',
    'Minangkabau',
    'Miscellaneous',
    'Mon-Khmer',
    'Manchu',
    'Manipuri',
    'Manobo ',
    'Mohawk',
    'Mossi',
    'Multiple',
    'Munda',
    'Creek',
    'Mirandese'
          ];
        }
      });

      Template.questionForm.events({
        'change select': function (e, t) {//e is the change event data, t is the template instance
        // the reference to select element in the template instance
          var select = t.$(e.target);
          //the context for the select
          var c = select.context;
          // the 0-based index of the selected option
          var selectedIndex = c.selectedIndex;
          // the value of the option at the selected index
          var selectedValue = c[selectedIndex].value;

          //store the value in Session variable for reative use
          Session.set('selectedLanguage', selectedValue);
          console.log(e,t,c,selectedIndex,selectedValue);
        }
      })


    Template.questionForm.events({
        'change select': function (e, t) {//e is the change event data, t is the template instance
        // the reference to select element in the template instance
          var select = t.$(e.target);
          //the context for the select
          var c = select.context;
          // the 0-based index of the selected option
          var selectedIndex = c.selectedIndex;
          // the value of the option at the selected index
          var selectedValue = c[selectedIndex].value;

          //store the value in Session variable for reative use
          Session.set('selectedMonth', selectedValue);
          console.log(e,t,c,selectedIndex,selectedValue);
        }
      })


}
