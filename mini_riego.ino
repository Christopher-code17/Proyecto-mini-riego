/*#include <LiquidCrystal.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// Pines
int bombaAgua = 8;
int sensorTemp = 9;
int boton = 10;

// Variables    
int temp;
int hum;
int estadoBoton;
String bluetoothCommand = "";

// Objetos
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
DHT dht(sensorTemp, DHT11);
ESP8266WebServer server(80);

// Configuración WiFi (Reemplaza con tus datos de red)
const char* ssid = "TU_SSID";
const char* password = "TU_PASSWORD";

// Funciones para control web
void handleAbrir() {
  digitalWrite(bombaAgua, LOW);
  server.send(200, "text/plain", "Bomba abierta");
}

void handleCerrar() {
  digitalWrite(bombaAgua, HIGH);
  server.send(200, "text/plain", "Bomba cerrada");
}

void setup() {
  // Configuración Pantalla
  lcd.begin(16, 2);

  // Configuración relé
  pinMode(bombaAgua, OUTPUT);

  // Configuración Sensor temp
  dht.begin();

  // Configuración botón
  pinMode(boton, INPUT);

  // Configuración Bluetooth
  Serial.begin(9600); // Los pines 0 (RX) y 1 (TX) son los pines de hardware serial del Arduino

  // Configuración WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi conectado");

  // Configuración servidor web
  server.on("/abrir", handleAbrir);
  server.on("/cerrar", handleCerrar);
  server.begin();
  Serial.println("Servidor HTTP iniciado");
}

void loop() {
  // Inicialización de Variables sensor
  temp = dht.readTemperature();
  hum = dht.readHumidity();
  estadoBoton = digitalRead(boton);

  // Lectura de comandos Bluetooth
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 'a') {
      digitalWrite(bombaAgua, LOW);
      lcd.setCursor(0, 0);
      lcd.print("*****Regando****");
      lcd.setCursor(0, 1);
      lcd.print("****************");
    } else if (c == 'c') {
      digitalWrite(bombaAgua, HIGH);
      lcd.setCursor(0, 0);
      lcd.print("Temperatura: " + String(temp) + " °C");
      lcd.setCursor(0, 1);
      lcd.print("Humedad: " + String(hum) + " %   ");
    }
  }

  // Pantalla
  if (temp != 0 || hum != 0) { // Mostrar solo si hay datos válidos del sensor
    lcd.setCursor(0, 0);
    lcd.print("Temperatura: " + String(temp) + " °C");
    lcd.setCursor(0, 1);
    lcd.print("Humedad: " + String(hum) + " %   ");
  }

  if (temp >= 25 && hum <= 20) { // Condición para regar automáticamente
    digitalWrite(bombaAgua, LOW); // Prender bomba de agua
    lcd.setCursor(0, 0);
    lcd.print("*****Regando****");
    lcd.setCursor(0, 1);
    lcd.print("****************");
    delay(5000); // Durante 5 segundos
  } else if (estadoBoton == HIGH) { // Si se presiona el botón
    digitalWrite(bombaAgua, LOW); // Prender bomba de agua
    lcd.setCursor(0, 0);
    lcd.print("*****Regando****");
    lcd.setCursor(0, 1);
    lcd.print("****************");
    delay(1000); // Durante un segundo
  } else if (!Serial.available()) { // Si ninguna de las condiciones anteriores y no hay comando Bluetooth...
    digitalWrite(bombaAgua, HIGH); // Bomba apagada
  }

  // Si no recibe información del sensor
  if (temp == 0 && hum == 0) {
    lcd.setCursor(0, 0);
    lcd.print("*****ERROR******");
    lcd.setCursor(0, 1);
    lcd.print("***NO SENSOR***");
    delay(1000); // Actualización cada segundo
  }

  // Manejar solicitudes web
  server.handleClient();
}*/
