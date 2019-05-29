package com.eipteam.healthsafe.nfc_manager.display;

public class Element {
    String text;
    String edit;

    public Element (String _text, String _edit) {
        text = _text;
        edit = _edit;
    }

    public String getText() {
        return text;
    }

    public String getEdit() {
        return edit;
    }
}
