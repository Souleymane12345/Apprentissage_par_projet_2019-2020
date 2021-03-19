#include <dht11.h>

dht11 DHT11;
int DHT11PIN = 11;
int capt_fl = 8 ;
int ir_output = 2 ;
String movement ;
int time;
int i = 0; // compteur de ligne
void setup() {
  pinMode(ir_output, INPUT);//Cp Mouvement
  pinMode(capt_fl, INPUT);//Cp Flamme
//  pinMode(DHTPIN,INPUT);//Temperatue et humidite
  pinMode(5, OUTPUT);//L1
  pinMode(6, OUTPUT);//L2
  pinMode(7, OUTPUT);//L3
  pinMode(4, OUTPUT);//R_p
  pinMode(3, OUTPUT);//R_co
  pinMode(9, OUTPUT);//R_cm
  pinMode(10, OUTPUT);//R_cf
  pinMode(12, OUTPUT);  //R_temp   
  pinMode(13, OUTPUT);  //R_pompe 
  Serial.begin(9600);

  digitalWrite(5 , HIGH);
  digitalWrite( 6,HIGH );
  digitalWrite( 7, HIGH);
 // digitalWrite( 8, LOW);
  digitalWrite( 4, HIGH);//prise ETEINT 
  digitalWrite( 3, LOW);//RCOURANT ETAT ALLUME LOW
  digitalWrite( 9, LOW);//cm
  digitalWrite( 10, LOW);//cf
  digitalWrite( 13, LOW);//r tem
  digitalWrite( 12, LOW);//pompe
  
  
 // dht.begin(); //initiaisation du dht22
}

void loop() {
   
   //DHT11.read(DHT11PIN);
  // commande des leds et appareils
 if(Serial.available() > 0) // Read from serial port
 {
  char statut ; // Store current character
  statut = (char) Serial.read();
  allumage(statut); // Convert character to state  
 }

  
 affiche ();
  
}
void affiche (){
  
  DHT11.read(DHT11PIN);
 /** float temp = float(DHT11.temperature);
  float hum = float(DHT11.humidity);
  Serial.print("Humidité (%): ");
  Serial.print(hum);
  Serial.print("\t");
  Serial.print("temperature");
  Serial.print(temp);
 */
  int sensorVa = analogRead(A0); 
  float sensorValue = sensorVa * (5.0 / 1023.0);
  float temp_intern =  float(DHT11.temperature);
  float hum_intern = float(DHT11.humidity);
  String temp_intern_str = String(temp_intern);
  String hum_intern_str = String(hum_intern); 
  String sensorValue_str = String(sensorValue);



  //debut 1
     if(digitalRead(ir_output)==HIGH  ){  //si le signal est à l'état haut
       
       int movement = 1;
       digitalWrite( 6, HIGH);
       String movement_str = String(movement);
        if(digitalRead(capt_fl)==HIGH  ){  //si le signal est à l'état haut
          int capteur_flamme = 1;
          String capteur_flamme_str = String(capteur_flamme);
           

    }
       else {  //si le signal est à l'état haut
          int capteur_flamme = 0 ;
          String capteur_flamme_str = String(capteur_flamme);
          String i_str = String(i);
          String str;   
          str += temp_intern_str;
          str += ";";
          str += hum_intern_str;
          str += ";";
          str += capteur_flamme_str;
          str += ";";
          str += sensorValue_str;
          str += ";";
          str += movement_str;
          Serial.println(str);
          delay(5000);
          i++;
     
     }
     digitalWrite( 6, LOW);
    
   }
   //fin 1
   //debut 2
    if(digitalRead(ir_output)==LOW  ){  //si le signal est à l'état haut
      
      int movement = 0; 
      String movement_str = String(movement);
        if(digitalRead(capt_fl)== HIGH  ){  //si le signal est à l'état haut
          int capteur_flamme = 1 ;
          String capteur_flamme_str = String(capteur_flamme);
          String i_str = String(i);
          String str;   
          str += temp_intern_str;
          str += ";";
          str += hum_intern_str;
          str += ";";
          str += capteur_flamme_str;
          str += ";";
          str += sensorValue_str;
          str += ";";
          str += movement_str;
          Serial.println(str);
          delay(5000);
          i++;
        }
        else {  //si le signal est à l'état haut
          int capteur_flamme = 0 ;
          String capteur_flamme_str = String(capteur_flamme);
      
           if (temp_intern <= 25){
               String temp_intern_str = "0";
               String i_str = String(i);
               String str;
               str += temp_intern_str;
               str += ";";
               str += hum_intern_str;
               str += ";";
               str += capteur_flamme_str;
               str += ";";
               str += sensorValue_str;
               str += ";";
               str += movement_str;
               Serial.println(str);
               delay(5000);
                i++;
              }
              else{
               String i_str = String(i);
               String str;
               str += temp_intern_str;
               str += ";";
               str += hum_intern_str;
               str += ";";
               str += capteur_flamme_str;
               str += ";";
               str += sensorValue_str;
               str += ";";
               str += movement_str;
               Serial.println(str);
               delay(5000);
                i++;  
              }
         }
     
     }
//fin 2  
  
   }

   
 
 void allumage (char var) {
    //led 3
    if(var=='1'){
     digitalWrite(7, HIGH);
     delay(15000);
     digitalWrite(7, LOW);
      
    }
    if(var== '0'){
      digitalWrite(7, LOW);
    }
    //2
    if(var=='2'){
     digitalWrite(6, HIGH);
     delay(15000);
     digitalWrite(6, LOW);
      
    }
    if(var== '3'){
      digitalWrite(6, LOW);
    }
    //1
     if(var=='4'){
     digitalWrite(5, HIGH);
     delay(15000);
     digitalWrite(5, LOW); 
    }
    if(var== '5'){
      digitalWrite(5, LOW);
    }
    // Reconnaisance vocal 
     // LED 1 francais
     if(var=='6'){
     digitalWrite(5, HIGH);
     delay(15000);
     digitalWrite(5, LOW);
       
    }
    if(var== '7'){
      digitalWrite(5, LOW);
    }
     // ventilo dioula
     if(var=='A'){
     digitalWrite(4, HIGH);
     delay(15000);
     digitalWrite(4, LOW);
       
    }
    if(var== 'B'){
      digitalWrite(4, LOW);
    }
         // LED 3 anglais
     if(var=='C'){
     digitalWrite(7, HIGH);
     delay(15000);
     digitalWrite(7, LOW);
       
    }
    if(var== 'D'){
      digitalWrite(7, LOW);
    }
         // Prise
     if(var=='E'){
     digitalWrite(4, HIGH);
     delay(15000);
     digitalWrite(4, LOW);
       
    }
    if(var== 'F'){
      digitalWrite(4, LOW);
    }

      //  Pompe 

     if(var=='G'){
     digitalWrite(12, HIGH);
     delay(15000);
     digitalWrite(12, LOW);
       
    }
    if(var== 'H'){
      digitalWrite(12, LOW);
    }
      

    /**
   if(var=='3'){
      digitalWrite(9, HIGH);
      // appele de la fonction affiche et commande des capteurs 
      affiche ();
    
     }
    if(var=='4'){
      digitalWrite(9, LOW);
      affiche ();
    }
   
    if(var=='5'){
      digitalWrite(7, HIGH);
      // appele de la fonction affiche et commande des capteurs 
      
    
    }
    if(var=='6'){
      digitalWrite(7, LOW);
    
    }
    */
 }
 
