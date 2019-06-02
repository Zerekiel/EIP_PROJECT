package com.eipteam.healthsafe;

import android.content.Context;
import android.content.Intent;
import android.net.Network;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public static void errorMsg(Context context, String err_msg) {
        Toast.makeText(context, err_msg, Toast.LENGTH_LONG).show();
    }

    public void connection(View view) throws JSONException {
        Intent intent = new Intent(this, ChooseDisplay.class);

        EditText identifiant = (EditText) findViewById(R.id.identifiant);
        String id1 = identifiant.getText().toString();

        EditText password = (EditText) findViewById(R.id.password);
        String id2 = password.getText().toString();

        JSONObject login = new JSONObject();
        login.put("name", id1);
        login.put("pass", id2);

        String rep = requestServer(login.toString());

        TransferData.error(this, rep);

        /*if ("deprost".equals(id1) && "password".equals(id2)) {
            startActivity(intent);
        }

        else {
            errorMsg(getApplicationContext(), "WRONG ID OR PASSWD");
        }*/
    }

    private static String requestServer(String content) {
        HttpURLConnection httpURLConnection = null;
        String response = null;
        InputStream inputStream;
        int ch;
        try{
            URL url = new URL("http://eip.epitech.eu/2021/healthsafe");
            httpURLConnection = (HttpURLConnection) url.openConnection();
            httpURLConnection.setConnectTimeout( 3000 * 10000); //Timeout until a connection is established
            httpURLConnection.setReadTimeout(3000 * 10000); //Timeout for waiting for data to come
            httpURLConnection.setRequestMethod("POST");
            httpURLConnection.setRequestProperty("Content-Type", "application/json");
            httpURLConnection.setRequestProperty("json", content);
            httpURLConnection.setDoInput(true);
            httpURLConnection.connect();
            inputStream = new BufferedInputStream( httpURLConnection.getInputStream());
            StringBuffer stringBuffer = new StringBuffer();
            while ((ch = inputStream.read()) != -1) {
                stringBuffer.append((char) ch);
            }
            response = stringBuffer.toString();
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        finally {
            httpURLConnection.disconnect();
        }
        return response;
    }
}