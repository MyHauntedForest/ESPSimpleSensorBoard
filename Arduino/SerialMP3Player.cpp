// Modified: https://github.com/salvadorrueda/SerialMP3Player

#include "Arduino.h"
#include "SerialMP3Player.h"

SerialMP3Player::SerialMP3Player()
{
    _showDebugMessages = false;
}

void SerialMP3Player::showDebug(bool op)
{
    // showDebug (op) 0:OFF 1:ON
    _showDebugMessages = op;
}

void SerialMP3Player::begin(int bps)
{
    Serial.begin(bps);
}

int SerialMP3Player::available()
{
    return Serial.available();
}

char SerialMP3Player::read()
{
    return Serial.read();
}

void SerialMP3Player::playNext()
{
    sendCommand(CMD_NEXT);
}

void SerialMP3Player::playPrevious()
{
    sendCommand(CMD_PREV);
}

void SerialMP3Player::volUp()
{
    sendCommand(CMD_VOL_UP);
}

void SerialMP3Player::volDown()
{
    sendCommand(CMD_VOL_DOWN);
}

void SerialMP3Player::setVol(byte v)
{
    // Set volumen (0-30)
    sendCommand(CMD_SET_VOL, v);
}

void SerialMP3Player::playSL(byte n)
{
    // Play single loop n file
    sendCommand(CMD_PLAY_SLOOP, n);
}

void SerialMP3Player::playSL(byte f, byte n)
{
    // Single loop play n file from f folder
    sendCommand(CMD_PLAY_SLOOP, f, n);
}

void SerialMP3Player::play()
{
    sendCommand(CMD_PLAY);
}

void SerialMP3Player::pause()
{
    sendCommand(CMD_PAUSE);
}

void SerialMP3Player::play(byte n)
{
    // n number of the file that must be played.
    // n possible values (1-255)
    sendCommand(CMD_PLAYN, n);
}

void SerialMP3Player::play(byte n, byte vol)
{
    // n number of the file that must be played

    sendCommand(CMD_PLAY_W_VOL, vol, n);
}

void SerialMP3Player::playF(byte f)
{
    // Play all files in the f folder

    sendCommand(CMD_FOLDER_CYCLE, f, 0);
}

void SerialMP3Player::stop()
{
    sendCommand(CMD_STOP_PLAY);
}

void SerialMP3Player::qPlaying()
{
    // Ask for the file is playing
    sendCommand(CMD_PLAYING_N);
}

void SerialMP3Player::qStatus()
{
    // Ask for the status.
    sendCommand(CMD_QUERY_STATUS);
}

void SerialMP3Player::qVol()
{
    // Ask for the volumen
    sendCommand(CMD_QUERY_VOLUME);
}

void SerialMP3Player::qFTracks(byte f)
{ // !!! Nonsense answer
    // Ask for the number of tracks folders
    sendCommand(CMD_QUERY_FLDR_TRACKS, f, 0);
}

void SerialMP3Player::qTTracks()
{
    // Ask for the total of tracks
    sendCommand(CMD_QUERY_TOT_TRACKS);
}

void SerialMP3Player::qTFolders()
{
    // Ask for the number of folders
    sendCommand(CMD_QUERY_FLDR_COUNT);
}

void SerialMP3Player::sleep()
{
    // Send sleep command
    sendCommand(CMD_SLEEP_MODE);
}

void SerialMP3Player::wakeup()
{
    // Send wake up command
    sendCommand(CMD_WAKE_UP);
}

void SerialMP3Player::reset()
{
    // Send reset command
    sendCommand(CMD_RESET);
}

void SerialMP3Player::sendCommand(byte command)
{
    sendCommand(command, 0, 0);
}

void SerialMP3Player::sendCommand(byte command, byte dat2)
{
    sendCommand(command, 0, dat2);
}

void SerialMP3Player::sendCommand(byte command, byte dat1, byte dat2)
{
    byte Send_buf[8] = {0}; // Buffer for Send commands.
    String mp3send = "";

    // Command Structure 0x7E 0xFF 0x06 CMD FBACK DAT1 DAT2 0xEF

    Send_buf[0] = 0x7E;    // Start byte
    Send_buf[1] = 0xFF;    // Version
    Send_buf[2] = 0x06;    // Command length not including Start and End byte.
    Send_buf[3] = command; // Command
    Send_buf[4] = 0x01;    // Feedback 0x00 NO, 0x01 YES
    Send_buf[5] = dat1;    // DATA1 datah
    Send_buf[6] = dat2;    // DATA2 datal
    Send_buf[7] = 0xEF;    // End byte

    for (int i = 0; i < 8; i++)
    {
        Serial.write(Send_buf[i]);
        mp3send += sbyte2hex(Send_buf[i]);
    }
    if (_showDebugMessages)
    {
        Serial.print("Sending: ");
        Serial.println(mp3send); // watch what are we sending
    }
}

// String sanswer(void);
// int iansbuf = 0;                 // Index for answer buffer.
// static uint8_t ansbuf[10] = {0}; // Buffer for the answers.

String SerialMP3Player::decodeMP3Answer()
{
    // Response Structure  0x7E 0xFF 0x06 RSP 0x00 0x00 DAT 0xFE 0xBA 0xEF
    //
    // RSP Response code
    // DAT Response additional data

    String decodedMP3Answer = "";

    decodedMP3Answer = sanswer();

    switch (ansbuf[3])
    {
    case 0x3A:
        decodedMP3Answer += " -> Memory card inserted.";
        break;

    case 0x3D:
        decodedMP3Answer += " -> Completed play num " + String(ansbuf[6], DEC);
        break;

    case 0x40:
        decodedMP3Answer += " -> Error";
        break;

    case 0x41:
        decodedMP3Answer += " -> Data recived correctly. ";
        break;

    case 0x42:
        switch (ansbuf[6])
        {
        case 0:
            decodedMP3Answer += " -> Status: stopped";
            break;
        case 1:
            decodedMP3Answer += " -> Status: playing";
            break;
        case 2:
            decodedMP3Answer += " -> Status: paused";
            break;
        }
        break;

    case 0x43:
        decodedMP3Answer += " -> Vol playing: " + String(ansbuf[6], DEC);
        break;

    case 0x48:
        decodedMP3Answer += " -> File count: " + String(ansbuf[6], DEC);
        break;

    case 0x4C:
        decodedMP3Answer += " -> Playing: " + String(ansbuf[6], DEC);
        break;

    case 0x4E:
        decodedMP3Answer += " -> Folder file count: " + String(ansbuf[6], DEC);
        break;

    case 0x4F:
        decodedMP3Answer += " -> Folder count: " + String(ansbuf[6], DEC);
        break;
    }

    ansbuf[3] = 0; // Clear ansbuff.
    return decodedMP3Answer;
}

// returns the file count on a good day
// returns -1 if bad shiz happened
int SerialMP3Player::getNumberOfTracks()
{
    qTTracks();
    delay(1020); // Not sure if this is needed, but it was how the orig code waited for a reply
    sanswer();   // fills ansbuf.. this code is fucking weird but I don't want to redo it.
    int count = -1;
    if (ansbuf[3] == 0x48)
    {
        count = ansbuf[6];
    }
    ansbuf[3] = 0; // Clear ansbuff.
    return count;
}

/********************************************************************************/
/*Function: sbyte2hex. Returns a byte data in HEX format.	                */
/*Parameter:- uint8_t b. Byte to convert to HEX.                                */
/*Return: String                                                                */

String SerialMP3Player::sbyte2hex(byte b)
{
    String shex;

    // Serial.print("0x");
    shex = "0X";

    // if (b < 16) Serial.print("0");
    if (b < 16)
        shex += "0";
    // Serial.print(b, HEX);
    shex += String(b, HEX);
    // Serial.print(" ");
    shex += " ";
    return shex;
}

/********************************************************************************/
/*Function: sanswer. Returns a String answer from mp3 UART module.	            */
/*Return: String.  the answer                                                   */

String SerialMP3Player::sanswer(void)
{
    // Response Structure  0x7E 0xFF 0x06 RSP 0x00 0x00 DAT 0xFE 0xBA 0xEF
    //
    // RSP Response code
    // DAT Response additional data

    // if there are something available start to read from mp3 serial.
    // if there are "0x7E" it's a beginning.
    //
    //  read while something readed and it's not the end "0xEF"

    byte b;
    String mp3answer = ""; // Answer from the Serial3.
    int iansbuf = 0;

    if (Serial.available())
    {
        do
        {
            b = Serial.read();

            if (b == 0x7E)
            {                // if there are "0x7E" it's a beginning.
                iansbuf = 0; //  ansbuf index to zero.
                mp3answer = "";
            }

            ansbuf[iansbuf] = b;
            mp3answer += sbyte2hex(ansbuf[iansbuf]);
            iansbuf++; //  increase this index.

        } while (b != 0xEF);
        // while there are something to read and it's not the end "0xEF"
    }
    return mp3answer;
}