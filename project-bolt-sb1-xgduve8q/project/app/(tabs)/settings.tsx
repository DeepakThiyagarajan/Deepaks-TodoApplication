import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Moon, Globe, Shield, CircleHelp as HelpCircle, Info, ChevronRight, Smartphone, Mail } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    Alert.alert(
      'Notifications',
      `Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`
    );
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
    Alert.alert(
      'Theme',
      `Dark mode ${!darkModeEnabled ? 'enabled' : 'disabled'}`
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    rightElement 
  }: {
    icon: React.ReactNode;
    title: string;
    description?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && (
            <Text style={styles.settingDescription}>{description}</Text>
          )}
        </View>
      </View>
      {rightElement || <ChevronRight size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <SettingItem
            icon={<Bell size={20} color="#667eea" />}
            title="Push Notifications"
            description="Get notified about task reminders"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: '#E5E7EB', true: '#667eea' }}
                thumbColor="#FFFFFF"
              />
            }
          />
          
          <SettingItem
            icon={<Mail size={20} color="#667eea" />}
            title="Email Notifications"
            description="Receive email updates for important tasks"
            rightElement={
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#E5E7EB', true: '#667eea' }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <SettingItem
            icon={<Moon size={20} color="#667eea" />}
            title="Dark Mode"
            description="Switch to dark theme"
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: '#E5E7EB', true: '#667eea' }}
                thumbColor="#FFFFFF"
              />
            }
          />
          
          <SettingItem
            icon={<Globe size={20} color="#667eea" />}
            title="Language"
            description="English (US)"
            onPress={() => Alert.alert('Language', 'Language settings coming soon!')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          
          <SettingItem
            icon={<Shield size={20} color="#667eea" />}
            title="Privacy Settings"
            description="Manage your data and privacy"
            onPress={() => Alert.alert('Privacy', 'Privacy settings coming soon!')}
          />
          
          <SettingItem
            icon={<Smartphone size={20} color="#667eea" />}
            title="App Permissions"
            description="Manage app permissions"
            onPress={() => Alert.alert('Permissions', 'Permission settings coming soon!')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <SettingItem
            icon={<HelpCircle size={20} color="#667eea" />}
            title="Help & Support"
            description="Get help or contact support"
            onPress={() => Alert.alert('Support', 'Contact: support@taskflow.app')}
          />
          
          <SettingItem
            icon={<Info size={20} color="#667eea" />}
            title="About"
            description="Version 1.0.0"
            onPress={() => Alert.alert('About', 'TaskFlow v1.0.0\nCreated for Deepak T.')}
          />
        </View>

        <View style={styles.developerSection}>
          <Text style={styles.developerText}>
            Crafted with ❤️ for Deepak T.
          </Text>
          <Text style={styles.versionText}>
            TaskFlow Mobile v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  developerSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  developerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
});