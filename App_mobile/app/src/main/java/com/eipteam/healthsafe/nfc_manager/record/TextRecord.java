package com.eipteam.healthsafe.nfc_manager.record;

import android.nfc.NdefRecord;

import com.google.common.base.Preconditions;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class TextRecord implements ParseNdefRecord {

    private final String mLanguageCode;

    private final String mText;

    public TextRecord(String mLanguageCode, String mText) {
        this.mLanguageCode = Preconditions.checkNotNull(mLanguageCode);
        this.mText = Preconditions.checkNotNull(mText);
    }

    @Override
    public String str() {
        return (mText);
    }

    public String getText() {
        return (mText);
    }

    public String getLanguageCode() {
        return (mLanguageCode);
    }

    public static TextRecord parse(NdefRecord record) {
        Preconditions.checkArgument(record.getTnf() == NdefRecord.TNF_WELL_KNOWN);
        Preconditions.checkArgument(Arrays.equals(record.getType(), NdefRecord.RTD_TEXT));

        try {
            byte[] payload = record.getPayload();

            String textEncoding = ((payload[0] & 0200) == 0) ? "UTF-8" : "UTF-16";

            int languageCodeLength = payload[0] & 0077;

            String languageCode = new String(payload, 1, languageCodeLength, "US-ASCII");

            String text = new String (payload, languageCodeLength + 1, payload.length - languageCodeLength - 1, textEncoding);

            return (new TextRecord(languageCode, text));
        } catch (UnsupportedEncodingException e) {
            throw (new IllegalArgumentException(e));
        }
    }

    public static boolean isText(NdefRecord record) {
        try {
            parse(record);
            return (true);
        } catch (IllegalArgumentException e) {
            return (false);
        }
    }
}