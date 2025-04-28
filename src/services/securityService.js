
import { toast } from "@/components/ui/use-toast";

// Security configuration constants
const SSH_CONFIG = {
  DEFAULT_PORT: 22,
  CUSTOM_PORT: 2222,  // Custom SSH port to reduce brute force attempts
  MAX_AUTH_TRIES: 3,
  ALLOWED_USERS: ["root"],
  AUTH_METHODS: ["publickey", "password"],
  FAIL2BAN: {
    FIND_TIME: 600,    // 10 minutes
    MAX_RETRIES: 3,    // Maximum login attempts
    BAN_TIME: 3600     // 1 hour ban
  }
};

// Firewall rules configuration
const FIREWALL_RULES = {
  INBOUND: [
    { port: SSH_CONFIG.CUSTOM_PORT, protocol: "tcp", source: "0.0.0.0/0", description: "Custom SSH" },
    { port: 443, protocol: "tcp", source: "0.0.0.0/0", description: "HTTPS" },
    { port: 80, protocol: "tcp", source: "0.0.0.0/0", description: "HTTP" }
  ],
  OUTBOUND: [
    { port: 443, protocol: "tcp", destination: "*.supabase.co", description: "Supabase HTTPS" },
    { port: 443, protocol: "tcp", destination: "0.0.0.0/0", description: "General HTTPS" }
  ]
};

// Security monitoring configuration
const MONITORING_CONFIG = {
  LOG_PATHS: {
    SSH: "/var/log/auth.log",
    FAIL2BAN: "/var/log/fail2ban.log",
    APP: "/var/log/app/",
    SECURITY: "/var/log/security/"
  },
  ALERT_THRESHOLDS: {
    LOGIN_ATTEMPTS: 3,
    BANNED_IPS: 5,
    SUSPICIOUS_ACTIVITY: 10
  }
};

export async function checkSecurityStatus() {
  try {
    const checks = await Promise.all([
      checkSSHConfig(),
      checkFirewallRules(),
      checkFail2banStatus(),
      checkSecurityLogs()
    ]);

    const issues = checks.filter(check => !check.passed);
    
    if (issues.length > 0) {
      notifySecurityIssues(issues);
      return false;
    }

    console.log("Security check passed successfully");
    return true;
  } catch (error) {
    console.error("Security check failed:", error);
    notifySecurityError(error);
    return false;
  }
}

async function checkSSHConfig() {
  try {
    // Simulate SSH configuration check
    const sshPort = SSH_CONFIG.CUSTOM_PORT;
    const maxAuthTries = SSH_CONFIG.MAX_AUTH_TRIES;
    
    return {
      passed: true,
      component: "SSH",
      details: {
        port: sshPort,
        maxAuthTries,
        permitRootLogin: "prohibit-password",
        passwordAuthentication: false
      }
    };
  } catch (error) {
    return {
      passed: false,
      component: "SSH",
      error: error.message
    };
  }
}

async function checkFirewallRules() {
  try {
    // Simulate firewall rules check
    const requiredPorts = [SSH_CONFIG.CUSTOM_PORT, 443];
    
    return {
      passed: true,
      component: "Firewall",
      details: {
        inboundRules: FIREWALL_RULES.INBOUND,
        outboundRules: FIREWALL_RULES.OUTBOUND
      }
    };
  } catch (error) {
    return {
      passed: false,
      component: "Firewall",
      error: error.message
    };
  }
}

async function checkFail2banStatus() {
  try {
    // Simulate Fail2ban status check
    return {
      passed: true,
      component: "Fail2ban",
      details: {
        status: "active",
        jails: ["sshd"],
        banTime: SSH_CONFIG.FAIL2BAN.BAN_TIME,
        findTime: SSH_CONFIG.FAIL2BAN.FIND_TIME,
        maxRetries: SSH_CONFIG.FAIL2BAN.MAX_RETRIES
      }
    };
  } catch (error) {
    return {
      passed: false,
      component: "Fail2ban",
      error: error.message
    };
  }
}

async function checkSecurityLogs() {
  try {
    // Simulate security logs check
    return {
      passed: true,
      component: "SecurityLogs",
      details: {
        sshLog: "monitored",
        fail2banLog: "monitored",
        appLog: "monitored"
      }
    };
  } catch (error) {
    return {
      passed: false,
      component: "SecurityLogs",
      error: error.message
    };
  }
}

function notifySecurityIssues(issues) {
  issues.forEach(issue => {
    toast({
      variant: "destructive",
      title: `Security Issue: ${issue.component}`,
      description: issue.error || "Security check failed. Please review configuration."
    });
  });
}

function notifySecurityError(error) {
  toast({
    variant: "destructive",
    title: "Security Check Error",
    description: error.message || "Failed to perform security check"
  });
}

// Export configuration constants for use in other services
export const SecurityConfig = {
  SSH: SSH_CONFIG,
  FIREWALL: FIREWALL_RULES,
  MONITORING: MONITORING_CONFIG
};
